import React from 'react';
import { MapPin, Map, Camera, Car, Utensils, Bed, Star, Users } from 'lucide-react';

interface FeatureComponentProps {
  onFeatureClick?: (feature: string) => void;
}

const FeatureComponent: React.FC<FeatureComponentProps> = ({ onFeatureClick }) => {
  const forYouItems = [
    {
      id: 1,
      title: "Sarafa Night Food Market",
      type: "Indian",
      icon: <Utensils className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      category: "Food"
    },
    {
      id: 2,
      title: "Hotel O The Dreams",
      type: "Hotel",
      icon: <Bed className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop",
      category: "Stay"
    },
    {
      id: 3,
      title: "Little Monk-Fine Dine Restaurant",
      type: "Indian",
      icon: <Utensils className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      category: "Food"
    }
  ];

  const getStartedItems = [
    {
      id: 1,
      title: "Take our travel quiz",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-teal-400 to-green-400",
      description: "Find your perfect destination"
    },
    {
      id: 2,
      title: "Create a trip",
      icon: <Car className="w-6 h-6" />,
      gradient: "from-blue-400 to-blue-600",
      description: "Plan your journey"
    },
    {
      id: 3,
      title: "Creator tools",
      icon: <Camera className="w-6 h-6" />,
      gradient: "from-yellow-400 to-orange-500",
      description: "Share your experiences"
    }
  ];

  const inspirationItems = [
    {
      id: 1,
      title: "Indore & Ujjain- India",
      author: "Travel Expert",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=200&fit=crop",
      type: "destination"
    },
    {
      id: 2,
      title: "Top 10 Restaurants in Auckland",
      author: "Food Critic",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
      type: "food"
    },
    {
      id: 3,
      title: "20 Things to Do with Teens in...",
      author: "Family Traveler",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
      type: "activities"
    }
  ];

  const handleItemClick = (item: any, section: string) => {
    if (onFeatureClick) {
      onFeatureClick(`${section}: ${item.title}`);
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900">2 travelers</h2>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">Budget</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Invite
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
              <span>Create a trip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* For you in section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h3 className="text-2xl font-bold text-gray-900">For you in</h3>
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Indore</span>
              </div>
              <div className="flex items-center space-x-2">
                <Map className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Map</span>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Explore
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {forYouItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => handleItemClick(item, 'For You')}
              >
                <div className="aspect-[4/3] bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-semibold text-lg mb-1 leading-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-white/90">
                    {item.icon}
                    <span className="text-sm">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get started section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Get started</h3>
          <div className="grid grid-cols-3 gap-4">
            {getStartedItems.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md bg-gradient-to-br ${item.gradient} aspect-[4/3] flex items-end`}
                onClick={() => handleItemClick(item, 'Get Started')}
              >
                <div className="absolute top-6 left-6">
                  <div className="text-white/80">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6 w-full">
                  <h4 className="text-white font-semibold text-lg leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get inspired section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Get inspired</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              See all
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {inspirationItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => handleItemClick(item, 'Get Inspired')}
              >
                <div className="aspect-[4/3] bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-semibold text-lg mb-1 leading-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/90 text-sm">{item.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureComponent;