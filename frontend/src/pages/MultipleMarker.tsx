import React, { useEffect, useRef, useState } from "react";

// Declare mappls on the window object for TypeScript
declare global {
  interface Window {
    mappls: any;
    initMapCallback?: () => void;
  }
}

interface Location {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

const MapplsMultipleMarkers: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  
  // Sample locations data
  const availableLocations: Location[] = [
    { name: "delhi", lat: 28.549511, lng: 77.2678250, description: "National Capital Territory of Delhi" },
    { name: "noida", lat: 28.544, lng: 77.5454, description: "Planned city in Uttar Pradesh" },
    { name: "faridabad", lat: 28.27189158, lng: 77.2158203125, description: "Industrial city in Haryana" },
    { name: "mumbai", lat: 19.076, lng: 72.8777, description: "Financial capital of India" },
    { name: "bangalore", lat: 12.9716, lng: 77.5946, description: "Silicon Valley of India" },
    { name: "chennai", lat: 13.0827, lng: 80.2707, description: "Detroit of India" },
    { name: "pune", lat: 18.5204, lng: 73.8567, description: "Oxford of the East" },
    { name: "hyderabad", lat: 17.3850, lng: 78.4867, description: "City of Pearls" },
  ];

  // ✅ Get token from backend instead of frontend
  const fetchToken = async (): Promise<string> => {
    const res = await fetch("http://localhost:5000/api/get-mappls-token");
    const data = await res.json();
    return data.access_token;
  };

  // Effect to initialize the map
  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;
    let initTimeout: NodeJS.Timeout;

    const initMap = async () => {
      try {
        const token = await fetchToken();
      
        // Define the callback function that the Mappls script will call
        window.initMapCallback = () => {
          initTimeout = setTimeout(() => {
            if (mapRef.current && window.mappls) {
              try {
                const mapInstance = new window.mappls.Map(mapRef.current, {
                  center: [28.61, 77.23], // [longitude, latitude]
                  zoomControl: true,
                  location: true,
                  zoom: 6, // Lower zoom to show multiple cities
                });
                
                setMap(mapInstance);
                setMapReady(true);
                setError("");
              } catch (mapError) {
                console.error("Map initialization error:", mapError);
                setError("Failed to initialize map: " + (mapError as Error).message);
              }
            } else {
              setError("Map container or Mappls SDK not available.");
            }
          }, 100);
        };

        // Create and append the Mappls SDK script
        scriptElement = document.createElement("script");
        scriptElement.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0&callback=initMapCallback`;
        scriptElement.async = true;
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
      if (scriptElement && scriptElement.parentNode) {
        document.head.removeChild(scriptElement);
      }
      delete window.initMapCallback;
    };
  }, []);

  // Function to create GeoJSON data from selected locations
  const createGeoJsonData = (locationNames: string[]) => {
    const features = locationNames.map(name => {
      const location = availableLocations.find(loc => loc.name === name);
      if (!location) return null;

      return {
        type: "Feature",
        properties: {
          htmlPopup: `<div style="padding: 8px; font-family: sans-serif;">
                        <h3 style="margin: 0 0 4px 0; color: #333; font-size: 14px; text-transform: capitalize;">${location.name}</h3>
                        <p style="margin: 0; color: #666; font-size: 12px;">${location.description || ''}</p>
                        <small style="color: #999; font-size: 10px;">Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}</small>
                      </div>`
        },
        geometry: {
          type: "Point",
          coordinates: [location.lat, location.lng] // [latitude, longitude] for Mappls
        }
      };
    }).filter(Boolean);

    return {
      type: "FeatureCollection",
      features: features
    };
  };

  // Function to handle checkbox changes
  const handleLocationToggle = (locationName: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(locationName)) {
        return prev.filter(name => name !== locationName);
      } else {
        return [...prev, locationName];
      }
    });
  };

  // Function to place multiple markers
  const handlePlaceMarkers = () => {
    if (!map || !mapReady || selectedLocations.length === 0) return;

    setIsLoading(true);
    setError("");

    try {
      // Remove existing markers if any
      if (markers) {
        markers.remove();
      }

      // Create GeoJSON data
      const geoData = createGeoJsonData(selectedLocations);

      // Create multiple markers using GeoJSON
      const newMarkers = new window.mappls.Marker({
        map: map,
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
    } catch (err) {
      console.error("Error placing markers:", err);
      setError("Failed to place markers: " + (err as Error).message);
    }

    setIsLoading(false);
  };

  // Function to clear all markers
  const handleClearMarkers = () => {
    if (markers) {
      markers.remove();
      setMarkers(null);
    }
    setSelectedLocations([]);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", fontFamily: 'sans-serif' }}>
      {/* Control Panel */}
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
          Multiple Location Markers
        </h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#555'}}>
            Select Locations:
          </h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '0.5rem' }}>
            {availableLocations.map((location) => (
              <label
                key={location.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  marginBottom: '0.25rem',
                  background: selectedLocations.includes(location.name) ? '#e3f2fd' : 'transparent'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location.name)}
                  onChange={() => handleLocationToggle(location.name)}
                  style={{ marginRight: '0.5rem' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: '0.9rem' }}>
                    {location.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    {location.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            Selected: {selectedLocations.length} location{selectedLocations.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
          <button
            onClick={handlePlaceMarkers}
            disabled={isLoading || !mapReady || selectedLocations.length === 0}
            style={{
              padding: "0.75rem",
              background: (isLoading || !mapReady || selectedLocations.length === 0) ? "#ccc" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: (isLoading || !mapReady || selectedLocations.length === 0) ? "not-allowed" : "pointer",
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
          >
            {isLoading ? "Placing Markers..." : mapReady ? `Place ${selectedLocations.length} Marker${selectedLocations.length !== 1 ? 's' : ''}` : "Loading Map..."}
          </button>
          
          <button
            onClick={handleClearMarkers}
            disabled={!markers}
            style={{
              padding: "0.75rem",
              background: !markers ? "#ccc" : "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: !markers ? "not-allowed" : "pointer",
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
          >
            Clear All Markers
          </button>
        </div>

        {error && (
          <div style={{ 
            marginTop: "0.75rem", 
            color: "#d9534f", 
            fontSize: "0.875rem", 
            textAlign: 'left',
            padding: '0.5rem',
            background: '#f8d7da',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: '#e8f4fd', 
          borderRadius: '4px',
          fontSize: '0.8rem',
          color: '#0c5460'
        }}>
          <strong>Features:</strong>
          <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
            <li>Marker clustering for better performance</li>
            <li>Interactive popups with location details</li>
            <li>Auto-fit bounds to show all markers</li>
            <li>Smooth animations and transitions</li>
          </ul>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} id="mappls-map-container" />
    </div>
  );
};

export default MapplsMultipleMarkers;