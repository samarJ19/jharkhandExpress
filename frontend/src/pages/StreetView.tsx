import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const StreetViewMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);

  // Hook to read URL query parameters
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get lat and lng from URL, or use a default
    const lat = parseFloat(searchParams.get('lat') || '42.345573');
    const lng = parseFloat(searchParams.get('lng') || '-71.098326');
    const location = { lat, lng };

    const initialize = () => {
      if (mapRef.current && panoRef.current && window.google) {
        // Use the dynamic location from the URL
        const map = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: 14,
        });

        const panorama = new window.google.maps.StreetViewPanorama(panoRef.current, {
          position: location,
          pov: { heading: 34, pitch: 10 },
          visible: true, // Ensure the panorama is visible on load
        });

        map.setStreetView(panorama);
      }
    };

    if (window.google) {
      initialize();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = initialize;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [searchParams]); // Rerun the effect if searchParams change

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div ref={mapRef} style={{ height: '100%', width: '50%' }} />
      <div ref={panoRef} style={{ height: '100%', width: '50%' }} />
    </div>
  );
};

export default StreetViewMap;