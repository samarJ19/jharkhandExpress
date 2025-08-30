import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// ... (keep declare global and formatRouteInfo functions as they are)
declare global {
  interface Window {
    mappls: any;
    initMapCallback?: () => void;
  }
}
const formatRouteInfo = (distanceMeters: number, durationSeconds: number) => {
    const distanceKm = (distanceMeters / 1000).toFixed(1);
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    let durationStr = '';
    if (hours > 0) durationStr += `${hours} hr `;
    if (minutes > 0) durationStr += `${minutes} min`;
    return { distance: `${distanceKm} km`, duration: durationStr.trim() };
};


// ✅ 1. Updated function to return SVG icons instead of emojis
const getManeuverIcon = (maneuver: any): React.ReactNode => {
  const type = maneuver.type;
  const modifier = maneuver.modifier;

  const style = { width: '24px', height: '24px', fill: '#333' };

  if (type === 'depart') return <svg style={style} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>;
  if (type === 'arrive') return <svg style={style} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/></svg>;

  switch (modifier) {
    case 'left':
    case 'sharp left':
    case 'slight left':
      return <svg style={style} viewBox="0 0 24 24"><path d="M9 5v2h6.58c1.33 0 2.42 1.08 2.42 2.42V18h-2v-8.58c0-.23-.19-.42-.42-.42H9v2L5 9l4-4z"/></svg>;
    case 'right':
    case 'sharp right':
    case 'slight right':
      return <svg style={style} viewBox="0 0 24 24"><path d="M15 5v2H8.42c-1.33 0-2.42 1.08-2.42 2.42V18h2v-8.58c0-.23.19-.42.42-.42H15v2l4-4-4-4z"/></svg>;
    case 'uturn':
      return <svg style={style} viewBox="0 0 24 24"><path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>;
    case 'straight':
    default:
      return <svg style={style} viewBox="0 0 24 24"><path d="M11 7v10h2V7h-2zm0-4h2v2h-2V3z"/></svg>;
  }
};


const DirectionsMap: React.FC = () => {
  // ... All state and other functions remain the same
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [originMarker, setOriginMarker] = useState<any>(null);
  const [destinationMarker, setDestinationMarker] = useState<any>(null);
  const [originInput, setOriginInput] = useState("Indore");
  const [destinationInput, setDestinationInput] = useState("Khandwa");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const locations: Record<string, { lat: number; lng: number; placeName: string }> = {
    indore: { lat: 22.7196, lng: 75.8577, placeName: "Indore" },
    khandwa: { lat: 21.8267, lng: 76.3456, placeName: "Khandwa" },
    delhi: { lat: 28.6139, lng: 77.2090, placeName: "New Delhi" },
    mumbai: { lat: 19.0760, lng: 72.8777, placeName: "Mumbai" },
    jaipur: { lat: 26.9124, lng: 75.7873, placeName: "Jaipur" },
  };
  const fetchToken = async (): Promise<string> => {
    const res = await axios.get("http://localhost:5000/api/get-mappls-token");
    return res.data.access_token;
  };
  useEffect(() => {
    const initMap = async () => {
      try {
        const token = await fetchToken();
        window.initMapCallback = () => {
          setTimeout(() => {
            if (mapRef.current && window.mappls) {
              const mapInstance = new window.mappls.Map(mapRef.current, { center: [22.7196, 75.8577], zoom: 10, });
              setMap(mapInstance);
              setMapReady(true);
            }
          }, 100);
        };
        const script = document.createElement("script");
        script.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0&callback=initMapCallback`;
        script.async = true;
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); delete window.initMapCallback; };
      } catch (err) { setError("Authentication failed. Is your backend running?"); }
    };
    initMap();
  }, []);
  const drawRoute = (routeGeoJSON: any) => {
    if (!map) return;
    if (map.getLayer('route')) { map.removeLayer('route'); map.removeSource('route'); }
    map.addSource('route', { 'type': 'geojson', 'data': routeGeoJSON });
    map.addLayer({ 'id': 'route', 'type': 'line', 'source': 'route', 'layout': { 'line-join': 'round', 'line-cap': 'round' }, 'paint': { 'line-color': '#007bff', 'line-width': 6 } });
    const coordinates = routeGeoJSON.coordinates;
    const bounds = coordinates.reduce((bounds: any, coord: any) => { return bounds.extend(coord); }, new window.mappls.LngLatBounds(coordinates[0], coordinates[0]));
    map.fitBounds(bounds, { padding: { top: 200, bottom: 200, left: 50, right: 50 } });
  };
  const handleGetDirections = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!map || !mapReady || !originInput.trim() || !destinationInput.trim()) return;
    setIsLoading(true);
    setError("");
    setRouteInfo(null);
    setSteps([]);
    const origin = locations[originInput.toLowerCase()];
    const destination = locations[destinationInput.toLowerCase()];
    if (!origin || !destination) { setError("Location not found. Try: Indore, Khandwa, Delhi, etc."); setIsLoading(false); return; }
    if (originMarker) originMarker.remove();
    if (destinationMarker) destinationMarker.remove();
    const newOriginMarker = new window.mappls.Marker({ map, position: { lat: origin.lat, lng: origin.lng } });
    const newDestMarker = new window.mappls.Marker({ map, position: { lat: destination.lat, lng: destination.lng } });
    setOriginMarker(newOriginMarker);
    setDestinationMarker(newDestMarker);
    try {
      const response = await axios.get("http://localhost:5000/api/get-directions", { params: { origin: `${origin.lat},${origin.lng}`, destination: `${destination.lat},${destination.lng}`, } });
      const data = response.data;
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        drawRoute(route.geometry);
        const { distance, duration } = formatRouteInfo(route.distance, route.duration);
        setRouteInfo({ distance, duration });
        if (route.legs && route.legs.length > 0 && route.legs[0].steps) { setSteps(route.legs[0].steps); }
      } else { setError("No route found between these locations."); }
    } catch (err) { setError("Failed to fetch directions. Please try again."); } finally { setIsLoading(false); }
  };


  return (
    <div style={{ display: 'flex', width: "100%", height: "100vh", fontFamily: 'sans-serif' }}>
      <div style={{ width: '30%', minWidth: '350px', maxWidth: '450px', background: '#fff', boxShadow: '2px 0 10px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: "1rem", borderBottom: '1px solid #eee' }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#333' }}>Get Directions</h2>
            <form onSubmit={handleGetDirections}>
              <input type="text" value={originInput} onChange={(e) => setOriginInput(e.target.value)} placeholder="Origin (e.g., Indore)" style={{ width: "100%", padding: "0.75rem", marginBottom: "0.5rem", boxSizing: "border-box", border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
              <input type="text" value={destinationInput} onChange={(e) => setDestinationInput(e.target.value)} placeholder="Destination (e.g., Khandwa)" style={{ width: "100%", padding: "0.75rem", marginBottom: "0.75rem", boxSizing: "border-box", border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
              <button type="submit" disabled={isLoading || !mapReady} style={{ width: "100%", padding: "0.75rem", background: isLoading || !mapReady ? "#ccc" : "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: isLoading || !mapReady ? "not-allowed" : "pointer", fontSize: '1rem', fontWeight: 'bold' }}>
                {isLoading ? "Fetching Route..." : mapReady ? "Get Directions" : "Loading Map..."}
              </button>
            </form>
            {error && <div style={{ marginTop: "0.75rem", color: "#d9534f", fontSize: "0.875rem", textAlign: 'center' }}>{error}</div>}
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem' }}>
            {routeInfo && ( <div style={{ margin: "1rem 0", padding: '0.75rem', background: '#f0f8ff', borderRadius: '4px' }}> <p style={{ margin: 0, fontSize: '1rem' }}><strong>Distance:</strong> {routeInfo.distance}</p> <p style={{ margin: '0.25rem 0 0 0', fontSize: '1rem' }}><strong>Duration:</strong> {routeInfo.duration}</p> </div> )}
            
            {steps.length > 0 && (
                <div>
                    <h3 style={{marginTop: '1rem'}}>Directions</h3>
                    {/* ✅ 2. Updated list rendering with new styles and simpler text */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {steps.map((step, index) => (
                            <li key={index} style={{ padding: '1rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ flexShrink: 0, width: '40px', textAlign: 'center' }}>
                                  {getManeuverIcon(step.maneuver)}
                                </div>
                                <div>
                                    {/* Using the direct instruction from the API */}
                                    <p style={{ margin: 0, fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>{step.maneuver.instruction}</p>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                                      {step.distance > 1000 ? `${(step.distance / 1000).toFixed(1)} km` : `${Math.round(step.distance)} m`}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </div>
      <div ref={mapRef} id="mappls-map-container" />
    </div>
  );
};

export default DirectionsMap;