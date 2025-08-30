import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// ... (keep declare global, formatRouteInfo, and getManeuverIcon functions as they are)
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
const getManeuverIcon = (maneuver: any) => {
  const type = maneuver.type;
  const modifier = maneuver.modifier;
  if (type === 'depart') return '📍';
  if (type === 'arrive') return '🏁';
  switch (modifier) {
    case 'left': return '⬅️';
    case 'right': return '➡️';
    case 'sharp left': return '↩️';
    case 'sharp right': return '↪️';
    case 'slight left': return '↖️';
    case 'slight right': return '↗️';
    case 'straight': return '⬆️';
    case 'uturn': return '🔄';
    default: return '➡️';
  }
};


// ✅ 1. New function to generate more human-readable instructions
const generateInstructionText = (step: any, nextStep: any | null): string => {
    const currentInstruction = step.maneuver.instruction;
    
    // If there is no next step, just return the current instruction
    if (!nextStep) {
        return currentInstruction;
    }

    // If the current step is a long "continue" or "straight" action,
    // append the next maneuver to it for clarity.
    const isStraight = step.maneuver.modifier === 'straight' || step.maneuver.type === 'continue';
    const distanceKm = (step.distance / 1000).toFixed(1);

  if (isStraight && step.distance > 200 && nextStep?.maneuver?.instruction)  { // Only for segments longer than 200m
        return `Continue for ${distanceKm} km, then ${nextStep.maneuver.instruction.toLowerCase()}`;
    }

    return currentInstruction;
};


const DirectionsMap: React.FC = () => {
  // ... (All state and other functions remain the same)
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [originMarker, setOriginMarker] = useState<any>(null);
  const [destinationMarker, setDestinationMarker] = useState<any>(null);
  const [originInput, setOriginInput] = useState("Delhi");
  const [destinationInput, setDestinationInput] = useState("Jaipur");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const locations: Record<string, { lat: number; lng: number; placeName: string }> = {
    delhi: { lat: 28.6139, lng: 77.2090, placeName: "New Delhi" },
    mumbai: { lat: 19.0760, lng: 72.8777, placeName: "Mumbai" },
    bangalore: { lat: 12.9716, lng: 77.5946, placeName: "Bangalore" },
    chennai: { lat: 13.0827, lng: 80.2707, placeName: "Chennai" },
    kolkata: { lat: 22.5726, lng: 88.3639, placeName: "Kolkata" },
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
              const mapInstance = new window.mappls.Map(mapRef.current, { center: [28.61, 77.23], zoom: 5, });
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
    if (!origin || !destination) { setError("Location not found. Try: Delhi, Mumbai, Bangalore, Chennai, Kolkata, or Jaipur."); setIsLoading(false); return; }
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
              <input type="text" value={originInput} onChange={(e) => setOriginInput(e.target.value)} placeholder="Origin (e.g., Delhi)" style={{ width: "100%", padding: "0.75rem", marginBottom: "0.5rem", boxSizing: "border-box", border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
              <input type="text" value={destinationInput} onChange={(e) => setDestinationInput(e.target.value)} placeholder="Destination (e.g., Jaipur)" style={{ width: "100%", padding: "0.75rem", marginBottom: "0.75rem", boxSizing: "border-box", border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
              <button type="submit" disabled={isLoading || !mapReady} style={{ width: "100%", padding: "0.75rem", background: isLoading || !mapReady ? "#ccc" : "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: isLoading || !mapReady ? "not-allowed" : "pointer", fontSize: '1rem', fontWeight: 'bold' }}>
                {isLoading ? "Fetching Route..." : mapReady ? "Get Directions" : "Loading Map..."}
              </button>
            </form>
            {error && <div style={{ marginTop: "0.75rem", color: "#d9534f", fontSize: "0.875rem", textAlign: 'center' }}>{error}</div>}
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {routeInfo && ( <div style={{ marginBottom: "1rem", padding: '0.75rem', background: '#f0f8ff', borderRadius: '4px' }}> <p style={{ margin: 0, fontSize: '1rem' }}><strong>Distance:</strong> {routeInfo.distance}</p> <p style={{ margin: '0.25rem 0 0 0', fontSize: '1rem' }}><strong>Duration:</strong> {routeInfo.duration}</p> </div> )}
            
            {steps.length > 0 && (
                <div>
                    <h3 style={{marginTop: 0}}>Directions</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {steps.map((step, index) => (
                            <li key={index} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{getManeuverIcon(step.maneuver)}</span>
                                <div>
                                    {/* ✅ 2. Call the new function to get the combined instruction text */}
                                    <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{generateInstructionText(step, steps[index + 1] || null)}</p>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#666' }}>{ (step.distance / 1000).toFixed(1) } km</p>
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