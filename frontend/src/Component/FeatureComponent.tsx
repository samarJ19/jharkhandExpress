import React from 'react';
import { MapPin, Map, Camera, Car, Utensils, Bed, Star, Users } from 'lucide-react';

interface FeatureComponentProps {
  onFeatureClick?: (feature: string) => void;
}

const FeatureComponent: React.FC<FeatureComponentProps> = ({ onFeatureClick }) => {
  const forYouItems = [
    {
      id: 1,
      title: "Jagannath Temple",
      type: "Temple",
      icon: <Utensils className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1714459481307-f45bf179435d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Temple"
    },
    {
      id: 2,
      title: "Ranchi Lake",
      type: "Lake",
      icon: <Bed className="w-4 h-4" />,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTepqO92MXP9YJn1sBxs_DlVDxkJCbYBQU9BQ&s",
      category: "Stay"
    },
    {
      id: 3,
      title: "Sun Temple",
      type: "Temple",
      icon: <Utensils className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1690313186501-445a6367d7e7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Temple"
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
      title: "Chasing Waterfalls:",
      author: "Nature & Adventure",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTx710375Ho3KqoOd9GbNmtqxX6E2QqlPBN1mP_1dBwStAE_WyBytbURxhNkiTh",
      type: "destination"
    },
    {
      id: 2,
      title: "The Painted Villages:",
      author: "Hidden Gems & History",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZjEGc0thER1zETzK6FhShnuRdHHniQtnnucakOOvQTcfG_91WJpSNjtE39gmN",
      type: "food"
    },
    {
      id: 3,
      title: "Ranchi's Top 10:",
      author: "Food & Culture",
      image: "https://assets.cntraveller.in/photos/656094b7b1b23f6efc757456/16:9/w_1024%2Cc_limit/IMG_6472.jpeg",
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
                <span className="font-medium">Ranchi</span>
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