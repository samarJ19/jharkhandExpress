import React, { useEffect, useRef, useState } from "react";

// Declare mappls on the window object for TypeScript
declare global {
  interface Window {
    mappls: any;
    initMapCallback?: () => void;
  }
}

interface Geocode {
  place: string;
  lat: string | null;
  lon: string | null;
}

interface LocationData {
  status: boolean;
  message: string;
  data: {
    poi: string[];
    geocodes: Geocode[];
  };
}

interface Location {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

interface MapplsMultipleMarkersProps {
  locationData: LocationData;
}

const MapplsMultipleMarkers: React.FC<MapplsMultipleMarkersProps> = ({ locationData }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [markers, setMarkers] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  
  // Convert the prop data to our internal Location format
  const availableLocations: Location[] = React.useMemo(() => {
    if (!locationData?.data?.geocodes) return [];
    
    return locationData.data.geocodes
      .filter(geocode => geocode.lat !== null && geocode.lon !== null) // Only include locations with valid coordinates
      .map(geocode => ({
        name: geocode.place,
        lat: parseFloat(geocode.lat!),
        lng: parseFloat(geocode.lon!),
        description: `Point of Interest in ${geocode.place.split(', ').pop()}` // Extract city/country as description
      }));
  }, [locationData]);

  // Calculate map center based on available locations
  const getMapCenter = () => {
    if (availableLocations.length === 0) return [28.61, 77.23]; // Default Delhi coordinates
    
    const avgLat = availableLocations.reduce((sum, loc) => sum + loc.lat, 0) / availableLocations.length;
    const avgLng = availableLocations.reduce((sum, loc) => sum + loc.lng, 0) / availableLocations.length;
    
    return [avgLng, avgLat]; // [longitude, latitude] for Mappls
  };

  // âœ… Get token from backend instead of frontend
  const fetchToken = async (): Promise<string> => {
    const res = await fetch("http://localhost:5000/api/get-mappls-token");
    const data = await res.json();
    return data.access_token;
  };

  // Effect to initialize the map
  useEffect(() => {
    if (availableLocations.length === 0) {
      setError("No valid locations with coordinates found in the provided data.");
      return;
    }

    let scriptElement: HTMLScriptElement | null = null;
    let initTimeout: NodeJS.Timeout;

    const initMap = async () => {
      try {
        const token = await fetchToken();
      
        window.initMapCallback = () => {
          // Use a longer timeout to ensure Mappls library is fully loaded
          initTimeout = setTimeout(() => {
            if (mapRef.current && window.mappls) {
              try {
                const mapInstance = new window.mappls.Map(mapRef.current, {
                  center: getMapCenter(),
                  zoomControl: true,
                  location: true,
                  zoom: availableLocations.length <= 1 ? 12 : 5,
                });

                mapInstanceRef.current = mapInstance;

                // Wait for map to be fully loaded before placing markers
                if (mapInstance && typeof mapInstance.on === 'function') {
                  mapInstance.on("load", () => {
                    setMapReady(true);
                    setError("");
                    // Place markers after map is fully loaded
                    setTimeout(() => {
                      placeAllMarkers();
                    }, 500); // Additional delay to ensure map is ready
                  });
                  
                  mapInstance.on('error', (e: any) => {
                    console.error("Map error:", e);
                    setError(`Map error: ${e.error?.message || 'Unknown map error'}`);
                  });
                } else {
                  throw new Error("Mappls map object is invalid or not fully initialized.");
                }

              } catch (mapError) {
                console.error("Map initialization error:", mapError);
                setError("Failed to initialize map: " + (mapError as Error).message);
              }
            } else {
              setError("Map container or Mappls SDK not available.");
            }
          }, 500); // Increased timeout to 500ms
        };

        scriptElement = document.createElement("script");
        scriptElement.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0&callback=initMapCallback`;
        scriptElement.async = true;
        scriptElement.defer = true;
        scriptElement.onerror = () => setError("Failed to load Mappls SDK.");
        document.head.appendChild(scriptElement);

      } catch (err) {
        console.error("Token fetch error:", err);
        setError("Authentication failed. Check if your backend is running.");
      }
    };

    initMap();

    return () => {
      if (initTimeout) clearTimeout(initTimeout);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn("Error removing map:", e);
        }
        mapInstanceRef.current = null;
      }
      if (scriptElement && scriptElement.parentNode) {
        document.head.removeChild(scriptElement);
      }
      delete window.initMapCallback;
    };
  }, [locationData]); // React to locationData changes

  // Function to create GeoJSON data from all available locations
  const createGeoJsonData = () => {
    const features = availableLocations.map(location => {
      return {
        type: "Feature",
        properties: {
          htmlPopup: `<div style="padding: 8px; font-family: sans-serif; max-width: 250px;">
                        <h3 style="margin: 0 0 4px 0; color: #333; font-size: 14px; line-height: 1.2;">${location.name}</h3>
                        <p style="margin: 0; color: #666; font-size: 12px; line-height: 1.3;">${location.description || ''}</p>
                        <small style="color: #999; font-size: 10px;">Lat: ${location.lat.toFixed(6)}, Lng: ${location.lng.toFixed(6)}</small>
                      </div>`
        },
        geometry: {
          type: "Point",
          coordinates: [location.lat, location.lng] // [latitude, longitude] for Mappls
        }
      };
    });

    return {
      type: "FeatureCollection",
      features: features
    };
  };

  // Function to place all markers automatically
  const placeAllMarkers = () => {
    const mapInstance = mapInstanceRef.current;
    if (!mapInstance || availableLocations.length === 0) {
      console.warn("Cannot place markers: map not ready or no locations available");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Remove existing markers if any
      if (markers) {
        markers.remove();
      }

      const geoData = createGeoJsonData();
      console.log("Placing markers with data:", geoData);

      const newMarkers = new window.mappls.Marker({
        map: mapInstance,
        position: geoData,
        icon_url: 'https://apis.mapmyindia.com/map_v3/1.png',
        clusters: true,
        fitbounds: true,
        fitboundOptions: {
          padding: 120,
          duration: 1000
        },
        popupOptions: {
          offset: { 'bottom': [0, -20] }
        }
      });

      setMarkers(newMarkers);
      console.log("Markers placed successfully");
    } catch (err) {
      console.error("Error placing markers:", err);
      setError("Failed to place markers: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading or error state if no data
  if (!locationData || !locationData.data) {
    return (
      <div style={{ 
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontFamily: 'sans-serif' 
      }}>
        <div style={{ textAlign: "center", color: "#666" }}>
          <h2>No location data provided</h2>
          <p>Please provide location data with valid geocodes to display the map.</p>
        </div>
      </div>
    );
  }

  if (availableLocations.length === 0) {
    return (
      <div style={{ 
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontFamily: 'sans-serif' 
      }}>
        <div style={{ textAlign: "center", color: "#666" }}>
          <h2>No valid locations found</h2>
          <p>No locations with valid coordinates were found in the provided data.</p>
          <p>Total locations: {locationData.data.geocodes.length}</p>
          <p>Valid locations: {availableLocations.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", fontFamily: 'sans-serif' }}>
      {/* Info Panel */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          width: "300px",
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto"
        }}
      >
        <h2 style={{margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#333'}}>
          Location Markers
        </h2>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#555'}}>
            Displayed Locations:
          </h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '0.5rem' }}>
            {availableLocations.map((location, index) => (
              <div
                key={location.name}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  marginBottom: '0.25rem',
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem', lineHeight: '1.2', marginBottom: '0.25rem' }}>
                  {index + 1}. {location.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.2', marginBottom: '0.25rem' }}>
                  {location.description}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#999' }}>
                  📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {isLoading && (
          <div style={{ 
            padding: '0.75rem', 
            background: '#fff3cd', 
            borderRadius: '4px',
            border: '1px solid #ffeaa7',
            color: '#856404',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            🔄 Loading markers...
          </div>
        )}

        {error && (
          <div style={{ 
            color: "#d9534f", 
            fontSize: "0.875rem", 
            textAlign: 'left',
            padding: '0.75rem',
            background: '#f8d7da',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            ❌ {error}
          </div>
        )}

        {mapReady && !isLoading && !error && (
          <div style={{ 
            padding: '0.75rem', 
            background: '#d4edda', 
            borderRadius: '4px',
            border: '1px solid #c3e6cb',
            color: '#155724',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            ✅ {availableLocations.length} markers placed successfully!
          </div>
        )}
      </div>

      {/* Map Container */}
      <div ref={mapRef} id="mappls-map-container" />
    </div>
  );
};

export default MapplsMultipleMarkers;