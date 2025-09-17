// Shimmer Loading Component
export const MapLoadingShimmer = () => {
  return (
    <div className="h-full w-full bg-gray-50 animate-pulse">
      <div className="p-6 space-y-4">
        {/* Map loading header */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        
        {/* Map container shimmer */}
        <div className="h-64 bg-gray-200 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 animate-pulse-shimmer"></div>
        </div>
        
        {/* Route details shimmer */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional info shimmer */}
        <div className="border-t pt-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-36"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
