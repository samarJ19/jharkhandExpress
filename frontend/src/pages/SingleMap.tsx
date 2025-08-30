import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// Declare mappls on the window object for TypeScript
declare global {
  interface Window {
    mappls: any;
    initMapCallback?: () => void;
  }
}

const MapplsLocationMarker: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [locationInput, setLocationInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  // ✅ Get token from backend instead of frontend
  const fetchToken = async (): Promise<string> => {
    const res = await axios.get("http://localhost:5000/api/get-mappls-token");
    return res.data.access_token;
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
                center: [28.61, 77.23],// Note: [longitude, latitude]
                  zoomControl: true,
                  location: true,
                });
                
                setMap(mapInstance);
                setMapReady(true); // Set map as ready
                setError("");
              } catch (mapError) {
                console.error("Map initialization error:", mapError);
                setError("Failed to initialize map: " + (mapError as Error).message);
              }
            } else {
              setError("Map container or Mappls SDK not available.");
            }
          }, 100); // A small delay can help ensure the DOM is fully ready
        };

        // Create and append the Mappls SDK script to the document head
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

    // Cleanup function to remove the script and callback
    return () => {
      if (initTimeout) clearTimeout(initTimeout);
      if (scriptElement && scriptElement.parentNode) {
        document.head.removeChild(scriptElement);
      }
      delete window.initMapCallback;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle the location search and marker placement
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!map || !mapReady || !locationInput.trim()) return;

    setIsLoading(true);
    setError("");

    // Hardcoded locations for the example
    const locations: Record<string, { lat: number; lng: number; placeName: string }> = {
      delhi: { lat: 28.6139, lng: 77.209, placeName: "New Delhi" },
      mumbai: { lat: 19.076, lng: 72.8777, placeName: "Mumbai" },
      bangalore: { lat: 12.9716, lng: 77.5946, placeName: "Bangalore" },
      chennai: { lat: 13.0827, lng: 80.2707, placeName: "Chennai" },
    };

    // Find the location from user input
    const key = locationInput.toLowerCase();
    const location =
      locations[key] ||
      Object.values(locations).find((loc) =>
        loc.placeName.toLowerCase().includes(key)
      );

    if (location) {
      // Remove the existing marker if there is one
      if (marker) {
        marker.remove();
      }

      // Create a new marker
      const newMarker = new window.mappls.Marker({
        map: map,
        // ✅ FIX: Pass a clean object with lat and lng to the position property
        position: { lat: location.lat, lng: location.lng },
        fitbounds: true, // This can also help in fitting the map to the marker
      });
      setMarker(newMarker);

      // ✅ FIX: Use flyTo for a smooth animation and provide coordinates
      // in the correct [longitude, latitude] order.
      map.flyTo({
        center: [location.lng, location.lat], // Correct order: [longitude, latitude]
        zoom: 12, // Zoom in to a reasonable level
        speed: 1.5,
      });

    } else {
      setError("Location not found. Try: Delhi, Mumbai, Bangalore, or Chennai");
    }

    setIsLoading(false);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", fontFamily: 'sans-serif' }}>
      {/* Search Box UI */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "white",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          width: "90%",
          maxWidth: "320px",
        }}
      >
        <h2 style={{margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#333'}}>Find a Location</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="e.g., Delhi, Mumbai..."
            style={{ 
                width: "100%", 
                padding: "0.75rem", 
                marginBottom: "0.75rem", 
                boxSizing: "border-box",
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !mapReady}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: isLoading || !mapReady ? "#ccc" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading || !mapReady ? "not-allowed" : "pointer",
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {isLoading ? "Searching..." : mapReady ? "Place Marker" : "Loading Map..."}
          </button>
        </form>
        {error && (
          <div style={{ marginTop: "0.75rem", color: "#d9534f", fontSize: "0.875rem", textAlign: 'center' }}>
            {error}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div ref={mapRef} id="mappls-map-container" />
    </div>
  );
};

export default MapplsLocationMarker;