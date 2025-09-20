import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Loader2, ShieldAlert, Users, MapPin, Wallet, ExternalLink } from "lucide-react";

interface Guide {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  verified: boolean;
  verificationTx?: string;
}

const AdminDashboard: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);

  // Fetch guides from backend
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

  // Verify guide
  const handleVerify = async (guideId: string) => {
    try {
      setVerifying(guideId);
      const res = await axios.post("http://localhost:5000/api/admin/guide/verify", {
        guideId,
      });
      console.log("Verify response:", res.data);
      fetchGuides(); // refresh list after verification
    } catch (err) {
      console.error("Error verifying guide", err);
    } finally {
      setVerifying(null);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage and verify tour guides</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Guides</p>
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
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-green-600">{guides.filter(g => g.verified).length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{guides.filter(g => !g.verified).length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Loader2 className="animate-spin w-8 h-8 text-white" />
            </div>
            <span className="text-lg font-medium text-gray-700">Loading guides...</span>
            <span className="text-sm text-gray-500 mt-1">Please wait while we fetch the data</span>
          </div>
        ) : (
          <div className="grid gap-6">
            {guides.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No guides found</h3>
                <p className="text-gray-500">There are no tour guides registered yet.</p>
              </div>
            ) : (
              guides.map((guide) => (
                <div
                  key={guide.id}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Guide Info */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">
                            {guide.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl font-bold text-gray-900 mb-1">{guide.name}</h2>
                          <p className="text-gray-600 mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            {guide.email}
                          </p>
                          
                          {/* Wallet Address */}
                          <div className="bg-gray-50 rounded-xl p-3 mb-4">
                            <div className="flex items-center space-x-2">
                              <Wallet className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-700">Wallet:</span>
                            </div>
                            <p className="text-sm text-gray-600 break-all mt-1 font-mono">
                              {guide.walletAddress}
                            </p>
                          </div>
                          
                          {/* Verification Status */}
                          {guide.verified ? (
                            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-200">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Verified Guide</span>
                              {guide.verificationTx && (
                                <a
                                  href={`https://etherscan.io/tx/${guide.verificationTx}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1 text-green-600 hover:text-green-800 transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span className="text-xs">
                                    {guide.verificationTx.slice(0, 8)}...
                                  </span>
                                </a>
                              )}
                            </div>
                          ) : (
                            <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-200">
                              <ShieldAlert className="w-5 h-5" />
                              <span className="font-medium">Pending Verification</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    {!guide.verified && (
                      <div className="lg:ml-6">
                        <button
                          onClick={() => handleVerify(guide.id)}
                          disabled={verifying === guide.id}
                          className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          {verifying === guide.id ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="animate-spin w-4 h-4" />
                              <span>Verifying...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Verify Guide</span>
                            </div>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
