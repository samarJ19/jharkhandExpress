

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, DollarSign, Building2, Smartphone, AlertTriangle, RefreshCw, Star, MapPin, ThumbsUp, MessageSquare, Camera, Download, Search, Bell, Settings, FileText, Activity } from 'lucide-react';

interface StatCardData {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface AlertData {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

interface SentimentData {
  overall: number;
  positive: number;
  neutral: number;
  negative: number;
}

interface ReviewData {
  id: string;
  tourist: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

const JharkhandTourismDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'tourism-stats' | 'sentiment-analysis'>('tourism-stats');

  const statsData: StatCardData[] = [
    {
      icon: <Users className="w-6 h-6" />,
      value: '4.65M',
      label: 'Annual Visitors',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: '₹698 Cr',
      label: 'Revenue Generated',
      change: '+18.3%',
      changeType: 'positive'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      value: '9,200',
      label: 'Employment Created',
      change: '+8.5%',
      changeType: 'positive'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      value: '82.3%',
      label: 'Digital Adoption',
      change: '+15.2%',
      changeType: 'positive'
    }
  ];

  const alertsData: AlertData[] = [
    {
      id: '1',
      icon: '⚠️',
      title: 'Infrastructure Alert',
      description: 'Road maintenance required at Hundru Falls access route',
      time: '2h ago',
      priority: 'high'
    },
    {
      id: '2',
      icon: '⏰',
      title: 'Capacity Warning',
      description: 'Deoghar temple complex approaching weekend capacity limits',
      time: '4h ago',
      priority: 'medium'
    }
  ];

  const sentimentData: SentimentData = {
    overall: 8.4,
    positive: 85,
    neutral: 12,
    negative: 3
  };

  const reviewsData: ReviewData[] = [
    {
      id: '1',
      tourist: 'Ananya Sharma',
      location: 'Deoghar Temple',
      rating: 5,
      comment: 'Absolutely divine experience! The spiritual atmosphere and beautiful architecture made our visit unforgettable.',
      date: '2 days ago',
      sentiment: 'positive'
    },
    {
      id: '2',
      tourist: 'Vikram Singh',
      location: 'Netarhat Hills',
      rating: 4,
      comment: 'Amazing sunset views! However, road conditions could be better. Still worth the journey.',
      date: '1 week ago',
      sentiment: 'positive'
    },
    {
      id: '3',
      tourist: 'Meera Gupta',
      location: 'Hundru Falls',
      rating: 3,
      comment: 'Beautiful waterfall but overcrowded during peak season. Better crowd management needed.',
      date: '3 days ago',
      sentiment: 'neutral'
    }
  ];

  const preferredLocations = [
    { name: 'Deoghar Temple', rating: 92, icon: '🏛️', visitors: '2.1M' },
    { name: 'Netarhat Sunset Point', rating: 89, icon: '🏔️', visitors: '1.8M' },
    { name: 'Hundru Falls', rating: 87, icon: '💦', visitors: '1.5M' },
    { name: 'Betla National Park', rating: 84, icon: '🐅', visitors: '1.2M' },
    { name: 'Parasnath Hills', rating: 81, icon: '⛰️', visitors: '950K' }
  ];

  const destinationData = [
    { name: 'Deoghar Temple', visitors: 2900 },
    { name: 'Parasnath Hills', visitors: 450 },
    { name: 'Netarhat Hill', visitors: 380 },
    { name: 'Hundru Falls', visitors: 320 },
    { name: 'Betla Park', visitors: 280 }
  ];

  const departmentData = [
    { name: 'Tourism Promotion', budget: '₹125Cr', spent: '₹98Cr', efficiency: 92, projects: 8, color: 'from-teal-400 to-teal-500' },
    { name: 'Heritage Conservation', budget: '₹85Cr', spent: '₹67Cr', efficiency: 88, projects: 5, color: 'from-blue-400 to-blue-500' },
    { name: 'Infrastructure Dev', budget: '₹65Cr', spent: '₹58Cr', efficiency: 85, projects: 12, color: 'from-green-400 to-green-500' },
    { name: 'Digital Initiatives', budget: '₹35Cr', spent: '₹28Cr', efficiency: 91, projects: 6, color: 'from-purple-400 to-purple-500' },
    { name: 'Staff Training', budget: '₹25Cr', spent: '₹23Cr', efficiency: 89, projects: 4, color: 'from-orange-400 to-orange-500' }
  ];

  const renderNavButton = (
    section: typeof activeSection,
    icon: string,
    label: string
  ) => (
    <button
      className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
        activeSection === section
          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-teal-600'
      }`}
      onClick={() => setActiveSection(section)}
    >
      <span className="flex items-center justify-center gap-2">
        <span className="text-lg">{icon}</span>
        {label}
      </span>
    </button>
  );

  const renderStatCard = (stat: StatCardData, index: number) => (
    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 text-white shadow-lg`}>
          {stat.icon}
        </div>
        <div className="flex items-center text-teal-500 text-sm font-medium">
          <TrendingUp className="w-4 h-4 mr-1" />
          {stat.change}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
      <div className="text-gray-600 text-sm">{stat.label}</div>
    </div>
  );

  const renderAlertItem = (alert: AlertData) => (
    <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-1 hover:shadow-md ${
      alert.priority === 'high' 
        ? 'border-red-500 bg-red-50' 
        : 'border-orange-500 bg-orange-50'
    }`}>
      <div className="text-2xl">{alert.icon}</div>
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{alert.title}</div>
        <div className="text-gray-600 text-sm mt-1">{alert.description}</div>
        <div className="text-gray-400 text-xs mt-2">{alert.time}</div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        alert.priority === 'high' 
          ? 'bg-red-500 text-white' 
          : 'bg-orange-500 text-white'
      }`}>
        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
      </span>
    </div>
  );

  const renderReviewCard = (review: ReviewData) => (
    <div key={review.id} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
            {review.tourist.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-800">{review.tourist}</div>
            <div className="text-sm text-gray-500">{review.location}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-3">{review.comment}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{review.date}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          review.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
          review.sentiment === 'neutral' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {review.sentiment}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Navigation */}
      <nav className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Jharkhand Express</h1>
            <ul className="flex items-center gap-8">
              <li><a href="#home" className="hover:text-teal-300 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Home</a></li>
              <li><a href="#treasures" className="hover:text-teal-300 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Treasures</a></li>
              <li><a href="#destinations" className="hover:text-teal-300 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Destinations</a></li>
              <li><a href="#experiences" className="hover:text-teal-300 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Experiences</a></li>
              <li><a href="#admin" className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg transition-colors duration-200">Admin Sign-In</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                🌍
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Jharkhand Tourism Analytics</h2>
                <p className="text-gray-600">Government Dashboard • Department of Tourism</p>
                <p className="text-teal-500 text-sm mt-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live Data • Real-time Updates
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400 cursor-pointer hover:text-teal-500" />
                <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-teal-500 relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </Bell>
                <Download className="w-5 h-5 text-gray-400 cursor-pointer hover:text-teal-500" />
                <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-teal-500" />
              </div>
              <div className="text-right bg-teal-50 rounded-lg px-4 py-2">
                <div className="text-teal-600 text-sm font-semibold">Last Updated</div>
                <div className="text-gray-800 font-bold">Sept 19, 2025 • 14:30</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="bg-white rounded-2xl p-2 shadow-lg mt-6 flex gap-2">
          {renderNavButton('tourism-stats', '📊', 'Tourism Statistics')}
          {renderNavButton('sentiment-analysis', '💭', 'Sentiment Analysis')}
          <Link 
            to="/adminTourGuide"
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 bg-white text-gray-600 hover:bg-gray-50 hover:text-teal-600"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg">✅</span>
              Guide Verification
            </span>
          </Link>
        </div>

        {/* Tourism Statistics Section */}
        {activeSection === 'tourism-stats' && (
          <div className="mt-8 space-y-8 animate-fade-in">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => renderStatCard(stat, index))}
            </div>

            {/* Department Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold text-gray-800">Department Performance Overview</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {departmentData.map((dept, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300">
                    <h4 className="font-semibold text-gray-800 mb-3">{dept.name}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Budget</div>
                        <div className="text-lg font-bold text-gray-800">{dept.budget}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Spent</div>
                        <div className="text-lg font-bold text-teal-600">{dept.spent}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${dept.color} h-2 rounded-full transition-all duration-1000`} 
                            style={{ width: `${dept.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-600">{dept.efficiency}%</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="text-blue-600 font-semibold">{dept.projects}</span> Projects
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-teal-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Top Destinations Performance</h3>
                </div>
                <div className="flex items-end justify-between gap-2 h-48">
                  {destinationData.map((dest, index) => {
                    const maxHeight = Math.max(...destinationData.map(d => d.visitors));
                    const height = (dest.visitors / maxHeight) * 180;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-teal-400 to-cyan-400 rounded-t-lg transition-all duration-1000 ease-out hover:from-teal-500 hover:to-cyan-500 cursor-pointer relative group"
                          style={{ height: `${height}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {dest.visitors}K visitors
                          </div>
                        </div>
                        <div className="text-xs mt-2 text-center text-gray-600 font-medium">
                          {dest.name.split(' ')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-teal-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Performance Trends</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm flex-1 font-medium">Tourist Flow (K)</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div className="bg-teal-500 h-3 rounded-full transition-all duration-1000 relative" style={{ width: '75%' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 font-semibold">315</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span className="text-sm flex-1 font-medium">Revenue (₹Cr)</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div className="bg-cyan-500 h-3 rounded-full transition-all duration-1000 relative" style={{ width: '65%' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 font-semibold">47.25</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                    <span className="text-sm flex-1 font-medium">Digital Adoption (%)</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div className="bg-sky-500 h-3 rounded-full transition-all duration-1000 relative" style={{ width: '82%' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 font-semibold">74</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-semibold text-gray-800">Priority Alerts</h3>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Auto-refresh
                  </span>
                </div>
                <div className="space-y-4">
                  {alertsData.map(renderAlertItem)}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <RefreshCw className="w-6 h-6 text-teal-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
                </div>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    Generate Report
                  </button>
                  <p className="text-sm text-gray-500 mb-4">Create comprehensive monthly analytics report</p>
                  
                  {/* <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from */}
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-3">
                    <Activity className="w-5 h-5" />
                    Update Capacity Status
                  </button>
                  <p className="text-sm text-gray-500">Manage destination capacity limits</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sentiment Analysis Section */}
        {activeSection === 'sentiment-analysis' && (
          <div className="mt-8 space-y-8 animate-fade-in">
            {/* Overall Sentiment Score */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold text-gray-800">Tourist Satisfaction Overview</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {sentimentData.overall}
                    </div>
                    <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full shadow-lg">
                      <span className="text-xs font-semibold text-gray-600">Overall</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">Satisfaction Score</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white text-lg font-bold mx-auto shadow-lg">
                    {sentimentData.positive}%
                  </div>
                  <div className="mt-3 text-sm font-semibold text-green-600">Positive</div>
                  <div className="text-xs text-gray-500">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white text-lg font-bold mx-auto shadow-lg">
                    {sentimentData.neutral}%
                  </div>
                  <div className="mt-3 text-sm font-semibold text-orange-600">Neutral</div>
                  <div className="text-xs text-gray-500">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center text-white text-lg font-bold mx-auto shadow-lg">
                    {sentimentData.negative}%
                  </div>
                  <div className="mt-3 text-sm font-semibold text-red-600">Negative</div>
                  <div className="text-xs text-gray-500">Reviews</div>
                </div>
              </div>
            </div>

            {/* Preferred Locations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <ThumbsUp className="w-6 h-6 text-teal-500" />
                <h3 className="text-xl font-semibold text-gray-800">Most Preferred Tourist Destinations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {preferredLocations.map((location, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 hover:from-teal-50 hover:to-cyan-50 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-3xl mb-3">{location.icon}</div>
                      <div className="font-semibold text-gray-800 text-sm mb-2">{location.name}</div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-gray-800">{location.rating}%</span>
                      </div>
                      <div className="text-xs text-gray-600">{location.visitors} annual visitors</div>
                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${location.rating}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tourist Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Camera className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Recent Tourist Reviews</h3>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Reviews
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviewsData.map(renderReviewCard)}
              </div>
            </div>

            {/* Sentiment Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-indigo-500" />
                <h3 className="text-xl font-semibold text-gray-800">Sentiment Analysis Trends</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">This Month</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all duration-1000 relative" style={{ width: '85%' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 font-semibold">8.5/10</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">Last Month</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-4 rounded-full transition-all duration-1000 relative" style={{ width: '78%' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 font-semibold">7.8/10</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">3 Mon Ago</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-4 rounded-full transition-all duration-1000 relative" style={{ width: '72%' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 font-semibold">7.2/10</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JharkhandTourismDashboard;