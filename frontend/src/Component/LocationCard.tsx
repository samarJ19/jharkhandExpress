import React, { useEffect, useState } from "react";
import { X, CameraOff, ChevronLeft, ChevronRight, Star } from "lucide-react";
import axios from "axios";
interface LocationCardProps {
  location: {
    place: string;
    lat: number;
    lng: number;
  };
  onClose: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onClose,
  style,
  className = "",
}) => {
  // --- State Management for API Data ---
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // --- Static state for UI interaction ---
  const [isLiked, setIsLiked] = React.useState(false);
  const isVerified = React.useMemo(() => Math.random() > 0.3, [location.place]); // Randomly verified


  useEffect(() => {
    setIsLoading(true);
    setImages([]);
    setError(null);
    setCurrentImageIndex(0);

    const fetchPlacePhotos = async () => {
      // --- START OF CHANGES ---
      try {
        // 1. Point to your own backend endpoint
        const backendUrl = 'http://localhost:5000/api/google-place-search';
        
        // 2. Send parameters to your backend
        const response = await axios.get(backendUrl, {
          params: {
            input: location.place,
            lat: location.lat,
            lng: location.lng,
          },
        });

        const candidate = response.data.candidates?.[0];

        if (candidate && candidate.photos) {
          // For the NEW Places API, photos are returned with different structure
          // We need to use the Place Photo (New) API format
          const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Key still needed for photo URLs
          const photoUrls = candidate.photos.slice(0, 5).map((photo: any) => {
            // New API format: use the photo name directly in the new photo API
            const photoReference = photo.photo_reference;
            if (photoReference) {
              // Still use the old photo API URL for compatibility
              return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
            } else {
              // If using new photo structure, construct the new photo URL
              return `https://places.googleapis.com/v1/${photo.name || `places/${candidate.place_id}/photos/${photoReference}`}/media?maxWidthPx=400&key=${apiKey}`;
            }
          }).filter(Boolean); // Remove any undefined URLs
          
          setImages(photoUrls);
        } else {
          setImages([]);
        }
      } catch (err) {
        console.error("Error fetching place data from backend:", err);
        setError("Could not load location images.");
      } finally {
        setIsLoading(false);
      }
      // --- END OF CHANGES ---
    };

    fetchPlacePhotos();
}, [location]);


  // --- Carousel Navigation ---
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  // --- Mock Data for non-image fields (can be replaced with more API calls) ---
  const mockDetails = React.useMemo(() => ({
      rating: (3.8 + Math.random() * 1.2).toFixed(1),
      reviews: `${(Math.random() * 20 + 1).toFixed(1)}k`,
  }), [location.place]);

  return (
    <div
      className={`bg-white rounded-xl shadow-2xl w-80 overflow-hidden border border-gray-100 relative z-50 ${className}`}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-20 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-1.5 shadow-sm transition hover:shadow-md"
      >
        <X className="w-4 h-4 text-gray-700" />
      </button>

      {/* --- Image Carousel --- */}
      <div className="relative h-48 bg-gray-200 group">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-600 p-4">
            <CameraOff className="w-8 h-8 mb-2"/>
            <span className="text-xs text-center font-medium">{error}</span>
          </div>
        ) : images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={location.place}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
                  {images.map((_, index) => (
                    <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-4">
            <CameraOff className="w-8 h-8 mb-2"/>
            <span className="text-xs font-medium">No images found</span>
          </div>
        )}
      </div>

      {/* --- Content Area --- */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-lg leading-tight truncate" title={location.place}>
              {location.place}
            </h3>
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900 text-sm">{mockDetails.rating}</span>
            <span className="text-gray-500 text-sm">({mockDetails.reviews})</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </p>
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            View Details
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
            Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
