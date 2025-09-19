import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, MapPin, DollarSign, Star, ThumbsUp, ThumbsDown, Minus, Calendar, Award, Eye, Camera, Activity } from 'lucide-react';

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock data for charts
  const touristVisitsData = [
    { location: 'Netarhat', visitors: 15420, revenue: 2850000 },
    { location: 'Betla National Park', visitors: 12800, revenue: 2340000 },
    { location: 'Hundru Falls', visitors: 18650, revenue: 1980000 },
    { location: 'Deoghar', visitors: 25100, revenue: 4200000 },
    { location: 'Patratu Valley', visitors: 9800, revenue: 1560000 },
    { location: 'Ranchi Hill', visitors: 11200, revenue: 1890000 }
  ];

  const monthlyRevenueData = [
    { month: 'Jan', hotels: 12, marketplace: 4.5, guides: 1.2, total: 17.7 },
    { month: 'Feb', hotels: 14.5, marketplace: 5.2, guides: 1.5, total: 21.2 },
    { month: 'Mar', hotels: 18, marketplace: 6.8, guides: 1.8, total: 26.6 },
    { month: 'Apr', hotels: 22, marketplace: 8.5, guides: 2.2, total: 32.7 },
    { month: 'May', hotels: 19.5, marketplace: 7.2, guides: 1.95, total: 28.65 },
    { month: 'Jun', hotels: 16.5, marketplace: 5.9, guides: 1.65, total: 24.05 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 68, color: '#10B981', count: 2856 },
    { name: 'Neutral', value: 22, color: '#F59E0B', count: 924 },
    { name: 'Negative', value: 10, color: '#EF4444', count: 420 }
  ];

  const topDestinationsData = [
    { destination: 'Deoghar', satisfaction: 92, visits: 25100, avgStay: 2.5, rating: 4.6 },
    { destination: 'Hundru Falls', satisfaction: 89, visits: 18650, avgStay: 1.2, rating: 4.5 },
    { destination: 'Netarhat', satisfaction: 94, visits: 15420, avgStay: 3.1, rating: 4.7 },
    { destination: 'Betla National Park', satisfaction: 87, visits: 12800, avgStay: 2.8, rating: 4.4 },
    { destination: 'Ranchi Hill', satisfaction: 85, visits: 11200, avgStay: 1.5, rating: 4.2 }
  ];

  const userRequirementsData = [
    { requirement: 'Better Transportation', count: 420, percentage: 28, priority: 'High', trend: '+5%' },
    { requirement: 'More Local Guides', count: 380, percentage: 25, priority: 'High', trend: '+12%' },
    { requirement: 'Improved Accommodations', count: 290, percentage: 19, priority: 'Medium', trend: '+3%' },
    { requirement: 'Digital Payments', count: 210, percentage: 14, priority: 'Medium', trend: '+8%' },
    { requirement: 'Multi-language Support', count: 180, percentage: 12, priority: 'Low', trend: '-2%' },
    { requirement: 'Safety Measures', count: 20, percentage: 2, priority: 'Low', trend: '+1%' }
  ];

  type StatCardProps = {
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    color: string;
    subtitle?: string;
  };

  const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-400 to-${color}-600`}></div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-lg bg-${color}-50 mr-3`}>
              <Icon className={`w-5 h-5 text-${color}-600`} />
            </div>
            <p className="text-gray-700 text-sm font-medium">{title}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mb-2">{subtitle}</p>}
          <div className="flex items-center">
            <div className={`flex items-center px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <TrendingUp className={`w-3 h-3 mr-1 ${change >= 0 ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
              <span className={`text-xs font-semibold ${change >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </div>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<any>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center mb-1">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-600 capitalize mr-2">{entry.dataKey}:</span>
              <span className="text-sm font-semibold text-gray-800">₹{entry.value}L</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <span className="text-sm font-bold text-gray-800">
              Total: ₹{payload.reduce((sum: number, entry: any) => sum + entry.value, 0).toFixed(1)}L
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const SentimentCard = ({ sentiment, index }: { sentiment: typeof sentimentData[number]; index: number }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: sentiment.color }}
          ></div>
          <h3 className="font-semibold text-gray-800">{sentiment.name}</h3>
        </div>
        <div className="flex items-center">
          {sentiment.name === 'Positive' && <ThumbsUp className="w-5 h-5 text-green-600" />}
          {sentiment.name === 'Neutral' && <Minus className="w-5 h-5 text-yellow-600" />}
          {sentiment.name === 'Negative' && <ThumbsDown className="w-5 h-5 text-red-600" />}
        </div>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold mb-2" style={{ color: sentiment.color }}>{sentiment.value}%</p>
        <p className="text-sm text-gray-600">{sentiment.count.toLocaleString()} responses</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div 
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            backgroundColor: sentiment.color, 
            width: `${sentiment.value}%`,
            animationDelay: `${index * 200}ms`
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-2xl border-b-4 border-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5"></div>
        <div className="max-w-7xl mx-auto px-6 py-8 relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Jharkhand Tourism Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Government Analytics & Insights Platform</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Activity className="w-4 h-4 mr-2" />
                <span>Real-time monitoring • Live updates • Data-driven insights</span>
              </div>
            </div>
            <div className="text-right bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="font-bold text-gray-800 text-lg">Sept 19, 2025</p>
              <div className="flex items-center justify-end mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Key Statistics */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard 
            title="Total Tourists This Year" 
            value="93,970" 
            change={15.2} 
            icon={Users} 
            color="blue"
            subtitle="Across all destinations"
          />
          <StatCard 
            title="Total Revenue Generated" 
            value="₹14.82 Cr" 
            change={22.8} 
            icon={DollarSign} 
            color="green"
            subtitle="YTD performance"
          />
          <StatCard 
            title="Active Destinations" 
            value="28" 
            change={8.5} 
            icon={MapPin} 
            color="purple"
            subtitle="Registered locations"
          />
          <StatCard 
            title="Average Satisfaction" 
            value="89.2%" 
            change={5.1} 
            icon={Star} 
            color="orange"
            subtitle="Based on reviews"
          />
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tourist Visits by Location */}
          <div className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                Tourist Visits by Location
              </h2>
              <div className="text-sm text-gray-500">Last 6 months</div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={touristVisitsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="location" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  fontSize={12}
                  stroke="#64748b"
                />
                <YAxis fontSize={12} stroke="#64748b" />
                <Tooltip 
                  formatter={(value) => [value.toLocaleString(), 'Visitors']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="visitors" 
                  fill="url(#barGradient)" 
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enhanced Revenue Analysis */}
          <div className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="p-2 bg-green-50 rounded-lg mr-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                Monthly Revenue Trends
              </h2>
              <div className="text-sm text-gray-500">₹ in Lakhs</div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlyRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="hotelGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="guideGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" fontSize={12} stroke="#64748b" />
                <YAxis fontSize={12} stroke="#64748b" />
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                <Line 
                  type="monotone" 
                  dataKey="hotels" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="marketplace" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="guides" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-6 space-x-8">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Hotels & Stays</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Tribal Marketplace</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Guide Services</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tourism Insights */}
        <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center">
            <div className="p-3 bg-orange-50 rounded-xl mr-4">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            Key Tourism Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-blue-500 rounded-full mx-auto mb-4 w-fit">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Peak Season</h3>
              <p className="text-blue-600 font-bold text-xl">March - April</p>
              <p className="text-sm text-gray-600 mt-2">40% more visitors</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-green-500 rounded-full mx-auto mb-4 w-fit">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Avg Revenue/Visitor</h3>
              <p className="text-green-600 font-bold text-xl">₹1,576</p>
              <p className="text-sm text-gray-600 mt-2">+12% from last year</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-purple-500 rounded-full mx-auto mb-4 w-fit">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Most Popular</h3>
              <p className="text-purple-600 font-bold text-xl">Deoghar</p>
              <p className="text-sm text-gray-600 mt-2">25,100 visitors</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-orange-500 rounded-full mx-auto mb-4 w-fit">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Avg Stay Duration</h3>
              <p className="text-orange-600 font-bold text-xl">2.2 Days</p>
              <p className="text-sm text-gray-600 mt-2">+0.3 days increase</p>
            </div>
          </div>
        </div>

        {/* Enhanced Sentiment Analysis */}
        <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center">
            <div className="p-3 bg-green-50 rounded-xl mr-4">
              <ThumbsUp className="w-6 h-6 text-green-600" />
            </div>
            Sentiment Analysis Results
            <span className="ml-4 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              4,200 Total Responses
            </span>
          </h2>
          
          {/* Sentiment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sentimentData.map((sentiment, index) => (
              <SentimentCard key={sentiment.name} sentiment={sentiment} index={index} />
            ))}
          </div>

          {/* Enhanced Destination Performance Table */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Top Performing Destinations
            </h3>
            <div className="bg-gray-50 rounded-xl p-6 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Destination</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Rating</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Satisfaction</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Visits</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Avg Stay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topDestinationsData.map((destination, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-white transition-colors duration-200 group">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                              {destination.destination.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                              {destination.destination}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-bold text-gray-800">{destination.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">/5.0</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-3 mr-3">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${destination.satisfaction}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{destination.satisfaction}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-800">{destination.visits.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {destination.avgStay} days
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Enhanced User Requirements */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Activity className="w-5 h-5 text-orange-500 mr-2" />
              Common User Requirements & Feedback Trends
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userRequirementsData.map((req, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:from-white hover:to-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg mb-1">{req.requirement}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{req.count} requests</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          req.priority === 'High' ? 'bg-red-100 text-red-700' :
                          req.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {req.priority} Priority
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{req.percentage}%</div>
                      <div className={`text-xs font-medium ${req.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {req.trend}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${req.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>30%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Analytics Summary */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Analytics Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">4.5/5.0</div>
                <div className="text-sm text-gray-600">Overall Platform Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">89%</div>
                <div className="text-sm text-gray-600">Would Recommend Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">2.1M</div>
                <div className="text-sm text-gray-600">Social Media Mentions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items Footer */}
        <div className={`bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl text-white transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Take Action?</h2>
            <p className="text-orange-100 mb-6 text-lg">
              Use these insights to improve Jharkhand's tourism infrastructure and visitor experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg">
                Generate Report
              </button>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 shadow-lg border border-orange-400">
                Schedule Meeting
              </button>
              <button className="bg-transparent text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 border border-white/30">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;