import React, { useState } from "react";
import { Heart, Check, Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

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
  className = "" 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper functions to generate mock data based on location name
  const getLocationCategory = (place: string): string => {
    const lowerPlace = place.toLowerCase();
    if (lowerPlace.includes('restaurant') || lowerPlace.includes('hotel') || lowerPlace.includes('cafe') || lowerPlace.includes('mtr')) return '🍽️ Restaurant';
    if (lowerPlace.includes('temple') || lowerPlace.includes('church') || lowerPlace.includes('mosque')) return '🏛️ Religious Site';
    if (lowerPlace.includes('park') || lowerPlace.includes('garden')) return '🌳 Park';
    if (lowerPlace.includes('mall') || lowerPlace.includes('market')) return '🛍️ Shopping';
    if (lowerPlace.includes('hospital') || lowerPlace.includes('clinic')) return '🏥 Healthcare';
    if (lowerPlace.includes('school') || lowerPlace.includes('college') || lowerPlace.includes('university')) return '🎓 Education';
    return '📍 Location';
  };

  const getLocationDescription = (place: string): string => {
    const category = getLocationCategory(place);
    if (category.includes('Restaurant')) {
      return `${place} is a popular dining destination known for its authentic cuisine and excellent service. A must-visit place for food enthusiasts.`;
    } else if (category.includes('Religious')) {
      return `${place} is a historic and spiritual landmark offering peace and cultural significance to visitors from around the world.`;
    } else if (category.includes('Park')) {
      return `${place} is a beautiful green space perfect for recreation, relaxation, and enjoying nature in the heart of the city.`;
    }
    return `${place} is a notable destination offering unique experiences and services to visitors. Well-located with excellent accessibility.`;
  };

  const getLocationImages = (place: string): string[] => {
    const category = getLocationCategory(place);
    if (category.includes('Restaurant')) {
      return [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format"
      ];
    } else if (category.includes('Religious')) {
      return [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73273?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=300&fit=crop&auto=format"
      ];
    } else if (category.includes('Park')) {
      return [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format"
      ];
    }
    return [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=300&fit=crop&auto=format"
    ];
  };

  // Mock data generation
  const mockLocationData = {
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    reviews: `${(Math.random() * 20 + 1).toFixed(1)}k`,
    category: getLocationCategory(location.place),
    description: getLocationDescription(location.place),
    priceRange: Math.random() > 0.5 ? "$$" : "$$$",
    images: getLocationImages(location.place),
    address: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockLocationData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockLocationData.images.length - 1 : prev - 1
    );
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-2xl w-80 overflow-hidden border border-gray-100 relative z-50 ${className}`}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1.5 shadow-sm transition-all hover:shadow-md"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Carousel */}
      <div className="relative h-48 bg-gray-200 group">
        <img
          src={mockLocationData.images[currentImageIndex]}
          alt={location.place}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&auto=format";
          }}
        />
        
        {/* Image navigation arrows */}
        {mockLocationData.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Action buttons overlay */}
        <div className="absolute top-3 left-3 flex space-x-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-all shadow-sm ${
              isLiked 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white bg-opacity-90 text-gray-600 hover:bg-opacity-100 hover:scale-105'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          {isVerified && (
            <div className="bg-blue-500 p-2 rounded-full shadow-sm">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Image indicators */}
        {mockLocationData.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {mockLocationData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        )}

        {/* Info button */}
        <button className="absolute bottom-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1.5 transition-all shadow-sm hover:shadow-md">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header with name and rating */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg leading-tight truncate" title={location.place}>
              {location.place}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {mockLocationData.category}
            </p>
          </div>
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900 text-sm">
              {mockLocationData.rating}
            </span>
            <span className="text-gray-500 text-sm">
              ({mockLocationData.reviews})
            </span>
          </div>
        </div>

        {/* Location address */}
        <p className="text-sm text-gray-500 mb-3">
          {mockLocationData.address}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
          {mockLocationData.description}
        </p>

        {/* Price range */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-green-600">
            {mockLocationData.priceRange}
          </span>
          <div className="flex space-x-1">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <MessageSquare className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <ThumbsUp className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <ThumbsDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Action buttons */}
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