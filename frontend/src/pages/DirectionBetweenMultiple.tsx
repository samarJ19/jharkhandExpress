import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";

// --- INTERFACES AND HELPER FUNCTIONS ---
interface Geocode {
  place: string;
  lat: string | null;
  lon: string | null;
}
interface LocationData {
  data: {
    geocodes: Geocode[];
  };
}
declare global {
  interface Window { mappls: any; initMapCallback?: () => void; }
}

const formatRouteInfo = (distanceMeters: number, durationSeconds: number) => {
  const distanceKm = (distanceMeters / 1000).toFixed(1);
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  let durationStr = '';
  if (hours > 0) durationStr += `${hours} hr `;
  if (minutes > 0) durationStr += `${minutes} min`;
  return { distance: `${distanceKm} km`, duration: durationStr.trim() || 'Less than a minute' };
};

const getManeuverIcon = (maneuver: any): React.ReactNode => {
    const type = maneuver.type;
    const modifier = maneuver.modifier;
    const style = { width: '24px', height: '24px', fill: '#333' };
    if (type === 'depart') return <svg style={style} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>;
    if (type === 'arrive') return <svg style={style} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/></svg>;
    switch (modifier) {
        case 'left': case 'sharp left': case 'slight left': return <svg style={style} viewBox="0 0 24 24"><path d="M9 5v2h6.58c1.33 0 2.42 1.08 2.42 2.42V18h-2v-8.58c0-.23-.19-.42-.42-.42H9v2L5 9l4-4z"/></svg>;
        case 'right': case 'sharp right': case 'slight right': return <svg style={style} viewBox="0 0 24 24"><path d="M15 5v2H8.42c-1.33 0-2.42 1.08-2.42 2.42V18h2v-8.58c0-.23-.19-.42-.42-.42H15v2l4-4-4-4z"/></svg>;
        case 'uturn': return <svg style={style} viewBox="0 0 24 24"><path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 0 4.42 3.58 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>;
        default: return <svg style={style} viewBox="0 0 24 24"><path d="M11 7v10h2V7h-2zm0-4h2v2h-2V3z"/></svg>;
    }
};

const DirectionsMap: React.FC<{ locationData: LocationData }> = ({ locationData }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [activeView, setActiveView] = useState('locations');
  
  const validLocations = useMemo(() => {
    // Now uses the locationData prop and re-calculates when it changes.
    if (!locationData?.data?.geocodes) return [];
    return locationData.data.geocodes
      .filter(geocode => geocode.lat && geocode.lon)
      .map(geocode => ({
        place: geocode.place,
        lat: parseFloat(geocode.lat!),
        lng: parseFloat(geocode.lon!),
      }));
  }, [locationData]);

  const fetchToken = async (): Promise<string> => {
    const res = await axios.get("http://localhost:5000/api/get-mappls-token");
    return res.data.access_token;
  };

  // Effect to initialize the map
  useEffect(() => {
    const initMap = async () => {
      try {
        const token = await fetchToken();
        window.initMapCallback = () => {
          setTimeout(() => {
            if (mapRef.current && window.mappls) {
              const center = validLocations.length > 0 ? [validLocations[0].lng, validLocations[0].lat] : [77.4126, 23.2599]; // Bhopal default
              const mapInstance = new window.mappls.Map(mapRef.current, { center, zoom: 12 });
              setMap(mapInstance);
              setMapReady(true);
            }
          }, 100);
        };
        const script = document.createElement("script");
        script.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0&callback=initMapCallback`;
        document.head.appendChild(script);
        return () => { 
          if (script.parentNode) document.head.removeChild(script); 
          delete window.initMapCallback; 
        };
      } catch (err) { 
        setError("Authentication failed. Ensure the backend for token is running."); 
        setIsLoading(false);
      }
    };
    initMap();
    // Intentionally left with an empty dependency array to run only once on mount.
    // The main drawing logic is handled in the next effect.
  }, []);

  const clearMapFeatures = () => {
    // Clear markers
    markersRef.current.forEach(marker => {
      if (marker && typeof marker.remove === 'function') marker.remove();
    });
    markersRef.current = [];
    // Clear route
    if (map) {
      try {
        if (map.getLayer('route')) map.removeLayer('route');
        if (map.getSource('route')) map.removeSource('route');
      } catch (e) { /* Ignore if it doesn't exist */ }
    }
  };

  const createMarkers = (locations: any[]) => {
    return locations.map((loc) => {
      const popupHtml = `<div style="font-family: sans-serif; padding: 10px;"><strong style="color: #333;">${loc.place}</strong></div>`;
      
      return new window.mappls.Marker({ 
        map: map, 
        position: { lat: loc.lat, lng: loc.lng },
        fitbounds: true,
        popupHtml: popupHtml,
      });
    });
  };

  // Main effect to draw markers and route based on props
  useEffect(() => {
    if (!mapReady || !map) return;

    const fetchDataAndDraw = async () => {
      setIsLoading(true);
      setError("");
      setRouteInfo(null);
      setSteps([]);
      
      clearMapFeatures();

      if (validLocations.length === 0) {
        setError("No valid locations provided.");
        setIsLoading(false);
        return;
      }
      
      // Create markers from validLocations
      markersRef.current = createMarkers(validLocations);
      
      // Handle route drawing for multiple locations
      if (validLocations.length > 1) {
        const pathString = validLocations.map(loc => `${loc.lng},${loc.lat}`).join(';');
        try {
          const directionsResponse = await axios.get("http://localhost:5000/api/get-directions-multi", { 
            params: { path: pathString } 
          });
          const route = directionsResponse.data.routes?.[0];
          if (route && route.geometry) {
            drawRoute(route.geometry);
            setRouteInfo(formatRouteInfo(route.distance, route.duration));
            setSteps(route.legs.reduce((allSteps: any[], leg: any) => [...allSteps, ...leg.steps], []));
          } else {
            setError("No route found connecting the locations.");
          }
        } catch (routeErr) {
          console.error("Failed to fetch directions:", routeErr);
          setError("Failed to fetch route. Showing locations only.");
        }
      } else {
        map.flyTo({ center: [validLocations[0].lng, validLocations[0].lat], zoom: 14 });
        setError("Add at least two locations to see a route.");
      }
      
      setIsLoading(false);
    };

    fetchDataAndDraw();
    
  }, [mapReady, map, validLocations]); // Re-run whenever map is ready or validLocations (from props) change

  const drawRoute = (routeGeoJSON: any) => {
    if (!map || !routeGeoJSON) return;
    try {
      map.addSource('route', { 'type': 'geojson', 'data': routeGeoJSON });
      map.addLayer({ 
        'id': 'route', 
        'type': 'line', 
        'source': 'route', 
        'layout': { 'line-join': 'round', 'line-cap': 'round' }, 
        'paint': { 'line-color': '#007bff', 'line-width': 6 } 
      });
    } catch (error) {
      console.error("Error drawing route:", error);
    }
  };

  const toggleButtonStyle = { flex: 1, padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', borderBottom: '3px solid transparent', transition: 'all 0.2s ease'};
  const activeToggleButtonStyle = { ...toggleButtonStyle, color: '#007bff', borderBottom: '3px solid #007bff' };

  return (
    <div style={{ display: 'flex', width: "100%", height: "100vh", fontFamily: 'sans-serif', backgroundColor: '#f9f9f9' }}>
      <div style={{ width: '30%', minWidth: '350px', maxWidth: '450px', background: '#fff', boxShadow: '2px 0 10px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: "1rem", borderBottom: '1px solid #eee' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#333' }}>Trip Details</h2>
          {isLoading && <p>Loading Trip Data...</p>}
          {error && <div style={{ color: "#d9534f", fontSize: '0.9rem', padding: '0.5rem', backgroundColor: '#fdd', borderRadius: '4px' }}>{error}</div>}
        </div>
        
        {validLocations.length > 0 && (
          <>
            <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
              <button onClick={() => setActiveView('directions')} style={activeView === 'directions' ? activeToggleButtonStyle : toggleButtonStyle} disabled={!routeInfo}>Directions</button>
              <button onClick={() => setActiveView('details')} style={activeView === 'details' ? activeToggleButtonStyle : toggleButtonStyle}>Locations</button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem' }}>
              {routeInfo && (
                <div style={{ margin: "1rem 0", padding: '0.75rem', background: '#f0f8ff', borderRadius: '4px' }}>
                  <p style={{ margin: 0 }}><strong>Distance:</strong> {routeInfo.distance}</p>
                  <p style={{ margin: '0.25rem 0 0 0' }}><strong>Duration:</strong> {routeInfo.duration}</p>
                </div>
              )}
              
              {activeView === 'directions' && (
                  steps.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
                      {steps.map((step, index) => (
                        <li key={index} style={{ padding: '1rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ flexShrink: 0, width: '40px', textAlign: 'center' }}>{getManeuverIcon(step.maneuver)}</div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{step.maneuver.instruction}</p>
                            <p style={{ margin: '0.25rem 0 0 0', color: '#666' }}>{step.distance > 1000 ? `${(step.distance / 1000).toFixed(1)} km` : `${Math.round(step.distance)} m`}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>{!isLoading && 'No directions to show.'}</div>
              )}
              
              {activeView === 'details' && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
                  {validLocations.map((loc, index) => (
                    <li key={loc.place} style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>{index + 1}. {loc.place}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
      
      <div ref={mapRef} id="mappls-map-container" />
    </div>
  );
};

export default DirectionsMap;