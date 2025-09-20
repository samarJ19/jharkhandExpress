import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, ShieldAlert, Loader2, Users, MapPin, Wallet, ExternalLink, Star, Phone } from "lucide-react";

interface Guide {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  verified: boolean;
  verificationTx?: string;
}

const GuideList: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Guide[]>("http://localhost:5000/api/admin/guides");
      setGuides(res.data);
    } catch (err) {
      console.error("Error fetching guides", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Available Tour Guides
              </h1>
              <p className="text-gray-600">Discover verified tour guides for your journey</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Available</p>
                  <p className="text-2xl font-bold text-gray-900">{guides.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified Guides</p>
                  <p className="text-2xl font-bold text-emerald-600">{guides.filter(g => g.verified).length}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
              <Loader2 className="animate-spin w-8 h-8 text-white" />
            </div>
            <span className="text-lg font-medium text-gray-700">Loading tour guides...</span>
            <span className="text-sm text-gray-500 mt-1">Finding the best guides for you</span>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No guides available</h3>
                <p className="text-gray-500">Check back later for available tour guides.</p>
              </div>
            ) : (
              guides.map((guide) => (
                <div
                  key={guide.id}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Guide Card Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">
                        {guide.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {guide.name}
                      </h2>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        Professional Guide
                      </p>
                    </div>
                  </div>
                  
                  {/* Guide Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{guide.email}</span>
                    </div>
                    
                    {/* Rating (placeholder - you can add actual ratings later) */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 text-yellow-400 fill-current" 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">5.0 (24 reviews)</span>
                    </div>
                  </div>
                  
                  {/* Wallet Address */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Wallet className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-700">Blockchain ID</span>
                    </div>
                    <p className="text-xs text-gray-600 break-all font-mono">
                      {guide.walletAddress.slice(0, 20)}...
                    </p>
                  </div>
                  
                  {/* Verification Status */}
                  <div className="flex items-center justify-between">
                    {guide.verified ? (
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl border border-emerald-200">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                        {guide.verificationTx && (
                          <a
                            href={`https://etherscan.io/tx/${guide.verificationTx}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-emerald-600 hover:text-emerald-800 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-3 py-2 rounded-xl border border-orange-200">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50">
                      Book Guide
                    </button>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideList;
