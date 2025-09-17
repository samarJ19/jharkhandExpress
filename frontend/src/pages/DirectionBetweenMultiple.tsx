import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Navigation, MapPin } from "lucide-react";
import LocationCard from "../Component/LocationCard";

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
  let durationStr = "";
  if (hours > 0) durationStr += `${hours} hr `;
  if (minutes > 0) durationStr += `${minutes} min`;
  return {
    distance: `${distanceKm} km`,
    duration: durationStr.trim() || "Less than a minute",
  };
};

const getManeuverIcon = (maneuver: any): React.ReactNode => {
  const type = maneuver.type;
  const modifier = maneuver.modifier;
  const iconClass = "w-6 h-6 text-gray-600";
  
  if (type === "depart") return <Navigation className={iconClass} />;
  if (type === "arrive") return <MapPin className={iconClass} />;
  
  switch (modifier) {
    case "left":
    case "sharp left":
    case "slight left":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 5v2h6.58c1.33 0 2.42 1.08 2.42 2.42V18h-2v-8.58c0-.23-.19-.42-.42-.42H9v2L5 9l4-4z" />
        </svg>
      );
    case "right":
    case "sharp right":
    case "slight right":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 5v2H8.42c-1.33 0-2.42 1.08-2.42 2.42V18h2v-8.58c0-.23-.19-.42-.42-.42H15v2l4-4-4-4z" />
        </svg>
      );
    case "uturn":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 0 4.42 3.58 8 8s8-3.58 8-8-3.58-8-8-8z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 7v10h2V7h-2zm0-4h2v2h-2V3z" />
        </svg>
      );
  }
};

const DirectionsMap: React.FC<{ locationData: LocationData }> = ({
  locationData,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [activeView, setActiveView] = useState("locations");
  
  // Panel state management
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [panelWidth, setPanelWidth] = useState(350);
  // Rename this state variable
const [selectedLocation, setSelectedLocation] = useState<{ place: string; lat: number; lng: number; } | null>(null);
  const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  
  const validLocations = useMemo(() => {
    if (!locationData?.data?.geocodes) {
      return [];
    }
    
    return locationData.data.geocodes
      .filter((geocode) => 
        geocode.lat && geocode.lon && 
        geocode.lat !== "null" && geocode.lon !== "null"
      )
      .map((geocode) => ({
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
              
              // --- CORRECTED MAP CENTERING LOGIC ---
              let centerCoords = { lat: 23.2599, lng: 77.4126 }; // Default to Bhopal
              let zoom = 5;

              if (validLocations.length > 0) {
                // Set center to the first valid location
                centerCoords = {
                  lat: validLocations[0].lat,
                  lng: validLocations[0].lng,
                };
                // Adjust zoom based on number of locations
                zoom = validLocations.length === 1 ? 14 : 10;
              }

              const mapInstance = new window.mappls.Map(mapRef.current, {
                center: centerCoords, // Pass the correctly structured object
                zoom,
              });
              // --- END OF CORRECTION ---
              
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
        console.error("Map initialization error:", err);
        setError("Authentication failed. Ensure the backend for token is running.");
        setIsLoading(false);
      }
    };
    initMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const clearMapFeatures = () => {
    markersRef.current.forEach((marker) => {
      if (marker && typeof marker.remove === "function") marker.remove();
    });
    markersRef.current = [];
    if (map) {
      try {
        if (map.getLayer && map.getLayer("route")) map.removeLayer("route");
        if (map.getSource && map.getSource("route")) map.removeSource("route");
      } catch (e) {
        console.warn("Error clearing route:", e);
      }
    }
  };

  const createMarkers = (locations: any[]) => {
    return locations.map((loc) => {
      const marker = new window.mappls.Marker({
        map: map,
        position: { lat: loc.lat, lng: loc.lng },
        fitbounds: false,
      });

      setTimeout(() => {
        const markerElement = marker.getElement ? marker.getElement() : marker._element;
        
        if (markerElement) {
          // ---  START: MODIFIED EVENT LISTENER ---
          // Change 'mouseenter' to 'click' and remove 'mouseleave'
          markerElement.addEventListener('click', (e: MouseEvent) => {
            e.stopPropagation();
            if (!mapRef.current) return;
            const mapRect = mapRef.current.getBoundingClientRect();
            const markerScreenPos = map.project([loc.lng, loc.lat]);
            
            const CARD_WIDTH = 250, CARD_HEIGHT = 120, MARGIN = 15;
            let x = mapRect.left + markerScreenPos.x + MARGIN;
            let y = mapRect.top + markerScreenPos.y + MARGIN;
            
            if (x + CARD_WIDTH > window.innerWidth) x -= (CARD_WIDTH + 2 * MARGIN);
            if (y + CARD_HEIGHT > window.innerHeight) y -= (CARD_HEIGHT + 2 * MARGIN);
            
            setCardPosition({ x: Math.max(MARGIN, x), y: Math.max(MARGIN, y) });
            // Use the new state setter
            setSelectedLocation(loc);
          });
          // --- END: MODIFIED EVENT LISTENER ---
          
          markerElement.style.cursor = 'pointer';
        } else {
          console.warn("Could not find marker DOM element for:", loc.place);
        }
      }, 100);

      return marker;
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
        setError("No valid locations with coordinates found.");
        setIsLoading(false);
        return;
      }

      markersRef.current = createMarkers(validLocations);

      if (validLocations.length > 1) {
        const pathString = validLocations.map((loc) => `${loc.lng},${loc.lat}`).join(";");
        try {
          const directionsResponse = await axios.get(
            "http://localhost:5000/api/get-directions-multi",
            { params: { path: pathString } }
          );
                    console.log("Full API Response:", directionsResponse.data);

          const route = directionsResponse.data.routes?.[0];
          console.log("Extracted Route Object:", route);

          if (route && route.geometry) {
            drawRoute(route.geometry);
            setRouteInfo(formatRouteInfo(route.distance, route.duration));
            const allSteps = route.legs?.reduce((acc: any[], leg: any) => [...acc, ...(leg.steps || [])], []) || [];
            setSteps(allSteps);
            setActiveView("directions");
          } else {
                        console.error("Route or route.geometry is missing!");

            setError("No route found connecting the locations.");
          }
        } catch (routeErr) {
          console.error("Failed to fetch directions:", routeErr);
          setError("Failed to fetch route. Showing locations only.");
        }
      } else {
        // If map didn't initialize at the right spot, this ensures it goes there.
        map.flyTo({
          center: {lat:validLocations[0].lat,lng:validLocations[0].lng},
          zoom: 14,
        });
      }

      setIsLoading(false);
    };

    fetchDataAndDraw();
  }, [mapReady, map, validLocations]);

  const drawRoute = (routeGeoJSON: any) => {
    if (!map || !routeGeoJSON) return;
    try {
      if (map.getSource('route')) {
        map.getSource('route').setData(routeGeoJSON);
      } else {
        map.addSource("route", { type: "geojson", data: routeGeoJSON });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#3b82f6", "line-width": 6, "line-opacity": 0.8 },
        });
      }
    } catch (error) {
      console.error("Error drawing route:", error);
    }
  };
  
  useEffect(() => {
    const resizeTimer = setTimeout(() => {
      if (map && typeof map.resize === 'function') map.resize();
    }, 300);
    return () => clearTimeout(resizeTimer);
  }, [isCollapsed, isMaximized, map]);
  
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const getPanelWidth = () => {
    if (isCollapsed) return 60;
    if (isMaximized) return Math.min(600, window.innerWidth * 0.5);
    return 350;
  };

  return (
    <div className="flex w-full h-full bg-gray-100">
      <div
        className="bg-white shadow-lg z-10 flex flex-col border-r border-gray-200 transition-all duration-300"
        style={{ width: `${getPanelWidth()}px`, minWidth: isCollapsed ? "60px" : "300px" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Trip Details
            </h2>
          )}
          <div className="flex items-center space-x-1">
            {!isCollapsed && (
              <button
                onClick={toggleMaximize}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4 text-gray-600" /> : <Maximize2 className="w-4 h-4 text-gray-600" />}
              </button>
            )}
            <button
              onClick={toggleCollapse}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-600" /> : <ChevronLeft className="w-4 h-4 text-gray-600" />}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {(isLoading || error) && (
              <div className="p-4 border-b border-gray-200">
                {isLoading && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Loading Trip Data...</span>
                  </div>
                )}
                {error && (
                  <div className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">{error}</div>
                )}
              </div>
            )}

            {validLocations.length > 0 && (
              <>
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveView("locations")}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeView === "locations" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Locations ({validLocations.length})
                  </button>
                  {routeInfo && (
                    <button
                      onClick={() => setActiveView("directions")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeView === "directions" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Directions
                    </button>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto">
                  {routeInfo && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Distance:</span>
                          <p className="font-semibold text-gray-900">{routeInfo.distance}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <p className="font-semibold text-gray-900">{routeInfo.duration}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeView === "locations" && (
                    <div className="p-4 space-y-3">
                      {validLocations.map((loc, index) => (
                        <div
                          key={`${loc.place}-${index}`}
                          className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => {
                            if (map?.flyTo) map.flyTo({ center: {lat:loc.lat,lng:loc.lng}, zoom: 14 });
                          }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate" title={loc.place}>{loc.place}</p>
                            <p className="text-xs text-gray-500 mt-1">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeView === "directions" && (
                    <div className="p-4">
                      {steps.length > 0 ? (
                        <div className="space-y-4">
                          {steps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200">
                              <div className="flex-shrink-0 mt-1">{getManeuverIcon(step.maneuver)}</div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 leading-5">{step.maneuver?.instruction || "Continue"}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {step.distance > 1000 ? `${(step.distance / 1000).toFixed(1)} km` : `${Math.round(step.distance)} m`}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Navigation className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No directions available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div ref={mapRef} className="flex-1 bg-gray-200" id="mappls-map-container" />
      
       {selectedLocation && (
        <LocationCard
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)} // Update state setter here
          style={{
            position: 'fixed',
            left: cardPosition.x,
            top: cardPosition.y,
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
};

export default DirectionsMap;