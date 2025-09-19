
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MapPin, DollarSign, Star, ThumbsUp, ThumbsDown, Calendar, Award, Eye, Camera, Activity, FileText, AlertTriangle, Shield, CheckCircle, Clock, Download, Filter, RefreshCw, Bell, Settings, Database, BarChart3, Target, Briefcase, Globe, Phone, Mail, MessageSquare, Search, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced realistic data
  const touristVisitsData = [
    { location: 'Deoghar Temple', visitors: 2850000, revenue: 42.75, satisfaction: 94 },
    { location: 'Parasnath Hills', visitors: 450000, revenue: 6.75, satisfaction: 88 },
    { location: 'Netarhat Hill Station', visitors: 320000, revenue: 4.8, satisfaction: 91 },
    { location: 'Hundru Falls', visitors: 280000, revenue: 4.2, satisfaction: 89 },
    { location: 'Betla National Park', visitors: 185000, revenue: 3.7, satisfaction: 87 },
    { location: 'Ranchi Rock Garden', visitors: 165000, revenue: 3.3, satisfaction: 85 }
  ];

  const monthlyTrendsData = [
    { month: 'Apr', tourists: 385, revenue: 57.75, digital: 68, infrastructure: 72 },
    { month: 'May', tourists: 420, revenue: 63.0, digital: 71, infrastructure: 75 },
    { month: 'Jun', tourists: 315, revenue: 47.25, digital: 74, infrastructure: 78 },
    { month: 'Jul', tourists: 290, revenue: 43.5, digital: 76, infrastructure: 80 },
    { month: 'Aug', tourists: 350, revenue: 52.5, digital: 79, infrastructure: 82 },
    { month: 'Sep', tourists: 380, revenue: 57.0, digital: 82, infrastructure: 85 }
  ];

  const departmentMetrics = [
    { department: 'Tourism Promotion', budget: 125, spent: 98, efficiency: 92, projects: 8 },
    { department: 'Heritage Conservation', budget: 85, spent: 67, efficiency: 88, projects: 5 },
    { department: 'Infrastructure Dev', budget: 65, spent: 58, efficiency: 85, projects: 12 },
    { department: 'Digital Initiatives', budget: 35, spent: 28, efficiency: 91, projects: 6 },
    { department: 'Staff Training', budget: 25, spent: 23, efficiency: 89, projects: 4 }
  ];

  const liveAlerts = [
    { type: 'critical', title: 'Infrastructure Alert', message: 'Road maintenance required at Hundru Falls access route', time: '2h ago', priority: 'High' },
    { type: 'warning', title: 'Capacity Warning', message: 'Deoghar temple complex approaching weekend capacity limits', time: '4h ago', priority: 'Medium' },
    { type: 'success', title: 'Project Update', message: 'Digital kiosk installation completed at Parasnath Hills', time: '6h ago', priority: 'Low' },
    { type: 'info', title: 'Policy Update', message: 'New sustainable tourism guidelines released by Ministry', time: '1d ago', priority: 'Medium' }
  ];

  type StatCardProps = {
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    subtitle?: string;
    color?: string;
    delay?: number;
  };

  const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, subtitle, color = 'teal', delay = 0 }) => (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-xl bg-${color}-50 mr-4 transform transition-transform duration-300 hover:rotate-6`}>
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
          {subtitle && <p className="text-sm text-gray-500 mb-3">{subtitle}</p>}
          <div className="flex items-center">
            <div className={`flex items-center px-3 py-1 rounded-full ${change >= 0 ? 'bg-teal-50' : 'bg-red-50'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${change >= 0 ? 'text-teal-600' : 'text-red-500 rotate-180'}`} />
              <span className={`text-sm font-semibold ${change >= 0 ? 'text-teal-700' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </div>
            <span className="text-sm text-gray-500 ml-3">vs last period</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alert, index }: { alert: typeof liveAlerts[number]; index: number }) => (
    <div 
      className={`p-5 rounded-xl border-l-4 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 ${
        alert.type === 'critical' ? 'bg-red-50 border-red-500 hover:bg-red-100' :
        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500 hover:bg-yellow-100' :
        alert.type === 'success' ? 'bg-teal-50 border-teal-500 hover:bg-teal-100' :
        'bg-blue-50 border-blue-500 hover:bg-blue-100'
      } ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {alert.type === 'critical' && <AlertTriangle className="w-6 h-6 text-red-500" />}
          {alert.type === 'warning' && <Clock className="w-6 h-6 text-yellow-500" />}
          {alert.type === 'success' && <CheckCircle className="w-6 h-6 text-teal-500" />}
          {alert.type === 'info' && <FileText className="w-6 h-6 text-blue-500" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">{alert.title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              alert.priority === 'High' ? 'bg-red-100 text-red-700' :
              alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {alert.priority}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
          <p className="text-xs text-gray-500">{alert.time}</p>
        </div>
      </div>
    </div>
  );

  type QuickActionButtonProps = {
    icon: React.ElementType;
    title: string;
    description: string;
    onClick?: () => void;
    delay?: number;
  };

  const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon: Icon, title, description, onClick, delay = 0 }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-teal-50 hover:to-teal-100 border border-gray-200 hover:border-teal-200 transition-all duration-300 text-left group transform hover:scale-105 hover:shadow-lg ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-lg bg-teal-100 group-hover:bg-teal-200 transition-colors mr-3">
          <Icon className="w-5 h-5 text-teal-600" />
        </div>
        <h3 className="font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-2xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-teal-500 mr-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
                  Jharkhand Tourism Analytics
                </h1>
                <p className="text-gray-600 text-sm">Government Dashboard • Department of Tourism</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-teal-600 font-medium">Live Data • Real-time Updates</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button className="p-3 rounded-xl bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-3 rounded-xl bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                <p className="text-sm text-teal-700 font-medium">Last Updated</p>
                <p className="font-bold text-teal-800">Sept 19, 2025 • 14:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Annual Visitors" 
            value="4.65M" 
            change={12.5} 
            icon={Users} 
            subtitle="FY 2024-25 Target: 5M"
            color="teal"
            delay={0}
          />
          <StatCard 
            title="Revenue Generated" 
            value="₹698 Cr" 
            change={18.3} 
            icon={DollarSign} 
            subtitle="Target: ₹750 Cr"
            color="emerald"
            delay={100}
          />
          <StatCard 
            title="Employment Created" 
            value="9,200" 
            change={8.5} 
            icon={Briefcase} 
            subtitle="Direct & Indirect Jobs"
            color="blue"
            delay={200}
          />
          <StatCard 
            title="Digital Adoption" 
            value="82.3%" 
            change={15.2} 
            icon={Activity} 
            subtitle="Platform Usage Rate"
            color="purple"
            delay={300}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Priority Alerts */}
          <div className={`lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="p-3 rounded-xl bg-red-100 mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                Priority Alerts
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Auto-refresh</span>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-4">
              {liveAlerts.map((alert, index) => (
                <AlertCard key={index} alert={alert} index={index} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <div className="p-3 rounded-xl bg-teal-100 mr-4">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              Quick Actions
            </h2>
            <div className="space-y-4">
              <QuickActionButton
                icon={FileText}
                title="Generate Report"
                description="Create comprehensive monthly analytics report"
                delay={100} onClick={undefined}              />
              <QuickActionButton
                icon={Database}
                title="Update Data"
                description="Sync latest tourism and revenue data"
                delay={200} onClick={undefined}              />
              <QuickActionButton
                icon={MapPin}
                title="Destination Management"
                description="Manage tourist destinations and facilities"
                delay={300} onClick={undefined}              />
              <QuickActionButton
                icon={Award}
                title="Policy Updates"
                description="Review new tourism policies and guidelines"
                delay={400} onClick={undefined}              />
              <QuickActionButton
                icon={MessageSquare}
                title="Stakeholder Communication"
                description="Send updates to tourism stakeholders"
                delay={500} onClick={undefined}              />
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Tourist Destinations Performance */}
          <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <div className="p-3 rounded-xl bg-blue-100 mr-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              Top Destinations Performance
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={touristVisitsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#0D9488" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="location" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  fontSize={12}
                  stroke="#64748b"
                />
                <YAxis fontSize={12} stroke="#64748b" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'visitors' ? value.toLocaleString() : `₹${value}Cr`,
                    name === 'visitors' ? 'Visitors' : 'Revenue'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="visitors" 
                  fill="url(#barGradient)" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends */}
          <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <div className="p-3 rounded-xl bg-emerald-100 mr-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              Performance Trends
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="touristGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" fontSize={12} stroke="#64748b" />
                <YAxis fontSize={12} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tourists" 
                  stroke="#14B8A6" 
                  strokeWidth={4}
                  dot={{ fill: '#14B8A6', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 3 }}
                  name="Tourists (K)"
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={4}
                  dot={{ fill: '#10B981', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 3 }}
                  name="Revenue (₹Cr)"
                />
                <Line 
                  type="monotone" 
                  dataKey="digital" 
                  stroke="#06B6D4" 
                  strokeWidth={3}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                  name="Digital Adoption (%)"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-6 space-x-8">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-teal-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Tourist Flow</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-cyan-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Digital Adoption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <div className="p-3 rounded-xl bg-purple-100 mr-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            Department Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {departmentMetrics.map((dept, index) => (
              <div 
                key={index} 
                className={`p-6 bg-gradient-to-br from-gray-50 to-teal-50 rounded-xl border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="font-semibold text-gray-800 mb-4">{dept.department}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-semibold text-gray-800">₹{dept.budget}Cr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Spent</span>
                    <span className="font-semibold text-teal-600">₹{dept.spent}Cr</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-teal-400 to-teal-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(dept.spent / dept.budget) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Efficiency</span>
                    <span className="font-semibold text-emerald-600">{dept.efficiency}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-semibold text-blue-600">{dept.projects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className={`bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 rounded-2xl p-10 text-white shadow-2xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Government of Jharkhand Tourism Dashboard</h2>
            <p className="text-teal-100 text-lg max-w-3xl mx-auto">
              Confidential analytics platform for authorized government personnel. Real-time insights driving data-driven tourism policy decisions.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="bg-white text-teal-700 px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <FileText className="w-5 h-5 inline mr-2" />
              Export Complete Report
            </button>
            <button className="bg-teal-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-400 transition-all duration-300 transform hover:scale-105 shadow-lg border border-teal-400">
              <Calendar className="w-5 h-5 inline mr-2" />
              Schedule Review Meeting
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/30">
              <Database className="w-5 h-5 inline mr-2" />
              Archive Historical Data
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-teal-500">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">99.8%</div>
              <div className="text-teal-200">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-teal-200">Monitoring Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">ISO 27001</div>
              <div className="text-teal-200">Security Certified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;