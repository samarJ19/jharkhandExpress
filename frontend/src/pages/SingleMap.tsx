import React, { useEffect, useRef, useState } from 'react';

interface LocationData {
  lat: number;
  lng: number;
  placeName?: string;
}

interface MapplsLocationMarkerProps {
  token: string;
  defaultCenter?: [number, number];
  defaultZoom?: number;
  markerIconUrl?: string;
}

// Extend the Window interface to include mappls
declare global {
  interface Window {
    mappls: any;
    initMap1?: () => void;
  }
}

const MapplsLocationMarker: React.FC<MapplsLocationMarkerProps> = ({
  token,
  defaultCenter = [28.61, 77.23],
  defaultZoom = 10,
  markerIconUrl = 'https://apis.mapmyindia.com/map_v3/1.png'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [locationInput, setLocationInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  // Initialize map
  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;
    let pluginScriptElement: HTMLScriptElement | null = null;

    const initializeMap = () => {
      console.log('Initializing map...');
      if (mapRef.current && window.mappls) {
        try {
          const mapInstance = new window.mappls.Map(mapRef.current, {
            center: defaultCenter,
            zoomControl: true,
            location: true,
            zoom: defaultZoom
          });
          console.log('Map created successfully');
          setMap(mapInstance);
        } catch (error) {
          console.error('Error creating map:', error);
          setError('Failed to initialize map');
        }
      } else {
        console.log('Map container or mappls not available');
      }
    };

    // Load Mappls SDK
    const loadMapplsSDK = () => {
      // Check if mappls is already loaded
      if (window.mappls) {
        console.log('Mappls already loaded');
        initializeMap();
        return;
      }

      // Set up the global callback function
      window.initMap1 = () => {
        console.log('Mappls SDK loaded, initializing map');
        initializeMap();
      };

      console.log('Loading Mappls SDK...');
      
      // Load main SDK
      scriptElement = document.createElement('script');
      scriptElement.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0&callback=initMap1`;
      scriptElement.defer = true;
      scriptElement.async = true;
      
      scriptElement.onerror = () => {
        console.error('Failed to load Mappls SDK');
        setError('Failed to load map SDK. Please check your token.');
      };
      
      document.head.appendChild(scriptElement);

      // Load plugins after a short delay
      setTimeout(() => {
        pluginScriptElement = document.createElement('script');
        pluginScriptElement.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk_plugins?v=3.0`;
        pluginScriptElement.defer = true;
        pluginScriptElement.async = true;
        document.head.appendChild(pluginScriptElement);
      }, 1000);
    };

    loadMapplsSDK();

    // Cleanup function
    return () => {
      if (scriptElement && document.head.contains(scriptElement)) {
        document.head.removeChild(scriptElement);
      }
      if (pluginScriptElement && document.head.contains(pluginScriptElement)) {
        document.head.removeChild(pluginScriptElement);
      }
      // Clean up global callback
      if (window.initMap1) {
        delete window.initMap1;
      }
    };
  }, [token, defaultCenter, defaultZoom]);

  // Function to search for location and place marker
  const searchAndPlaceMarker = async () => {
    if (!locationInput.trim() || !map) {
      setError('Please enter a location name and ensure map is loaded');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For now, let's use a simple approach with place search
      // You might need to adjust this based on your Mappls API access
      
      // Alternative: Use geocoding if available
      if (window.mappls && window.mappls.search) {
        window.mappls.search({
          query: locationInput,
          region: 'IND'
        }, (data: any) => {
          console.log('Search results:', data);
          if (data && data.length > 0) {
            const place = data[0];
            const coordinates = {
              lat: parseFloat(place.latitude || place.lat || place.entryLatitude),
              lng: parseFloat(place.longitude || place.lng || place.entryLongitude),
              placeName: place.placeName || place.place_name || place.placeAddress || locationInput
            };
            
            if (!isNaN(coordinates.lat) && !isNaN(coordinates.lng)) {
              setCurrentLocation(coordinates);
              placeMarkerOnMap(coordinates);
            } else {
              setError('Invalid coordinates received for the location');
            }
          } else {
            setError('Location not found. Please try a different search term.');
          }
          setIsLoading(false);
        }, (error: any) => {
          console.error('Search error:', error);
          setError('Failed to search location. Please try again.');
          setIsLoading(false);
        });
      } else {
        // Fallback: Use some default locations for testing
        const testLocations: { [key: string]: LocationData } = {
          'delhi': { lat: 28.6139, lng: 77.2090, placeName: 'New Delhi' },
          'mumbai': { lat: 19.0760, lng: 72.8777, placeName: 'Mumbai' },
          'bangalore': { lat: 12.9716, lng: 77.5946, placeName: 'Bangalore' },
          'chennai': { lat: 13.0827, lng: 80.2707, placeName: 'Chennai' },
          'kolkata': { lat: 22.5726, lng: 88.3639, placeName: 'Kolkata' }
        };
        
        const searchKey = locationInput.toLowerCase();
        const foundLocation = testLocations[searchKey] || 
                             Object.values(testLocations).find(loc => 
                               loc.placeName?.toLowerCase().includes(searchKey)
                             );
        
        if (foundLocation) {
          setCurrentLocation(foundLocation);
          placeMarkerOnMap(foundLocation);
        } else {
          setError('Search API not available. Try: Delhi, Mumbai, Bangalore, Chennai, or Kolkata');
        }
        setIsLoading(false);
      }

    } catch (err) {
      console.error('Error searching location:', err);
      setError('An error occurred while searching. Please try again.');
      setIsLoading(false);
    }
  };

  // Function to place marker on map
  const placeMarkerOnMap = (location: LocationData) => {
    if (!map) return;

    // Remove existing marker if any
    if (marker) {
      marker.remove();
    }

    // Create new marker
    const newMarker = new window.mappls.Marker({
      map: map,
      position: {
        lat: location.lat,
        lng: location.lng
      },
      fitbounds: true,
      icon_url: markerIconUrl
    });

    setMarker(newMarker);

    // Center map on the new location
    map.setCenter([location.lat, location.lng]);
    map.setZoom(15);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchAndPlaceMarker();
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Search Input Overlay */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '400px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter location name (e.g., New Delhi, Mumbai)"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !locationInput.trim()}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isLoading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {isLoading ? 'Searching...' : 'Search & Place Marker'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div style={{
            marginTop: '10px',
            padding: '8px',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {error}
          </div>
        )}

        {/* Current Location Info */}
        {currentLocation && (
          <div style={{
            marginTop: '10px',
            padding: '8px',
            backgroundColor: '#e8f5e8',
            color: '#2d5a2d',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <strong>Current Location:</strong><br />
            {currentLocation.placeName}<br />
            Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        id="map"
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
};

export default MapplsLocationMarker;