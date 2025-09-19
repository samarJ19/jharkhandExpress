# 🌟 Jharkhand Express - Smart Tourism Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF.svg)](https://vitejs.dev/)

**Jharkhand Express** is an intelligent tourism platform that revolutionizes travel planning in Jharkhand through AI-powered itinerary generation, interactive maps, cultural commerce, and immersive experiences. Built for the Smart India Hackathon 2025, this platform combines modern web technologies with tourism innovation.

---

## 🎯 **Project Vision**

Transform Jharkhand tourism by providing tourists with personalized, AI-driven travel experiences while supporting local artisans and promoting sustainable tourism practices. Our platform bridges the gap between travelers and authentic cultural experiences through intelligent technology.

---

## ✨ **Key Features**

### 🤖 **AI-Powered Trip Planning**
- **Intelligent Chatbot**: Natural language processing for personalized itinerary generation
- **Real-time Streaming**: Live response streaming from AI models for instant travel suggestions
- **POI Extraction**: Automatic extraction and geocoding of points of interest from conversations
- **Context-Aware Planning**: Recommendations based on user preferences, budget, and travel style

### 🗺️ **Advanced Mapping & Navigation**
- **Interactive Maps**: Powered by Mappls API with real-time directions
- **Multi-location Routing**: Optimized routes connecting multiple destinations
- **Street View Integration**: Google Street View for location previews
- **Location Cards**: Rich media display with photos and detailed information

### 🛍️ **Cultural Commerce Platform**
- **Artisan Marketplace**: Direct support for local craftspeople
- **Interactive Product Catalog**: Detailed product views with specifications
- **Smart Shopping Cart**: Full e-commerce functionality with cart management
- **Authentic Crafts**: Traditional Jharkhand handicrafts, textiles, and art pieces

### 📊 **Tourism Analytics Dashboard**
- **Real-time Metrics**: Tourist visits, revenue tracking, satisfaction scores
- **Performance Analytics**: Destination popularity and trend analysis
- **Data Visualization**: Interactive charts and graphs for stakeholders
- **Business Intelligence**: Insights for tourism development

### 🎨 **Immersive User Experience**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Customization**: Multiple color themes for personalization
- **Progressive Web App**: Offline capabilities and app-like experience
- **Accessibility**: WCAG compliant design for inclusive access

---

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  External APIs  │
│   (React)       │◄──►│   (Express)     │◄──►│                 │
│                 │    │                 │    │  • Google Maps  │
│ • Home Page     │    │ • REST API      │    │  • Mappls       │
│ • AI Chatbot    │    │ • Streaming     │    │  • Places API   │
│ • Maps          │    │ • Authentication│    │  • AI Services  │
│ • Commerce      │    │ • CORS          │    │                 │
│ • Dashboard     │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🛠️ **Technology Stack**

### **Frontend**
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 6.0.1
- **Styling**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.8.2
- **AI Integration**: AI SDK 2.0.28
- **HTTP Client**: Axios 1.11.0
- **Charts**: Recharts 3.2.1
- **Markdown**: React Markdown 10.1.0

### **Backend**
- **Runtime**: Node.js with Express 5.1.0
- **Language**: TypeScript 5.9.2
- **Development**: Nodemon with ts-node
- **Environment**: dotenv for configuration
- **CORS**: Enabled for cross-origin requests

### **External Services**
- **Mapping**: Mappls API for Indian mapping
- **Places**: Google Places API (New Version)
- **Street View**: Google Street View API
- **AI Services**: Custom AI endpoints for itinerary generation

---

## 🚀 **Quick Start Guide**

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Git for version control
- Environment variables (API keys)

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/samarJ19/jharkhandExpress.git
   cd jharkhandExpress
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Add your API keys to .env:
   # MAPPLS_CLIENT_ID=your_mappls_client_id
   # MAPPLS_CLIENT_SECRET=your_mappls_client_secret
   # MAPPLS_REST_API_KEY=your_mappls_api_key
   # GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Start development server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Create environment file
   cp .env.example .env.local
   
   # Add your API keys to .env.local:
   # VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Start development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📱 **Application Pages & Features**

### **🏠 Home Page (`/`)**
**Landing Experience with Modern Design**
- **Hero Section**: Dynamic typing animation showcasing Jharkhand destinations
- **Feature Highlights**: AI-powered planning, cultural immersion, artisan support
- **Destination Carousel**: Automated slideshow of famous Jharkhand locations
- **User Testimonials**: Social proof from satisfied travelers
- **Theme Switching**: Multiple color themes for user preference
- **Responsive Navigation**: Mobile-friendly header with smooth transitions

### **💬 AI Chatbot (`/chat`)**
**Intelligent Travel Planning Assistant**
- **Natural Language Processing**: Conversational interface for trip planning
- **Streaming Responses**: Real-time AI-generated itineraries
- **POI Integration**: Automatic location extraction and mapping
- **Feature Suggestions**: Contextual travel recommendations
- **Multi-modal Output**: Text responses with interactive map integration
- **Loading States**: Smooth transitions with loading animations

### **🗺️ Interactive Maps**
**Advanced Mapping Capabilities**
- **Multi-location Routing**: Connect multiple destinations with optimized paths
- **Direction Instructions**: Step-by-step navigation guidance
- **Location Cards**: Rich media display with photos and details
- **Street View Integration**: 360° previews of destinations
- **Custom Markers**: Themed location indicators
- **Responsive Controls**: Touch-friendly map interactions

### **🛍️ Commerce Platform (`/jharkhand-treasures`)**
**Cultural Marketplace for Authentic Crafts**
- **Product Categories**: Featured, New Arrivals, Popular Items
- **Interactive Cards**: Hover effects and detailed product information
- **Product Modal**: Full-screen detailed view with specifications
- **Shopping Cart**: Add, remove, modify quantities
- **Artisan Profiles**: Support local craftspeople
- **E-commerce Features**: Pricing, ratings, availability status
- **Responsive Design**: Mobile-optimized shopping experience

### **📊 Analytics Dashboard (`/dashboard`)**
**Tourism Insights & Business Intelligence**
- **Key Metrics**: Real-time tourism statistics
- **Performance Charts**: Interactive visualizations using Recharts
- **Destination Analytics**: Visitor tracking and revenue analysis
- **Trend Monitoring**: Monthly and seasonal patterns
- **Quick Actions**: Stakeholder notifications and updates
- **Responsive Layout**: Dashboard adapts to all screen sizes

---

## 🔗 **API Endpoints**

### **Backend REST API (`http://localhost:5000`)**

#### **Authentication & Tokens**
```
GET /api/get-mappls-token
- Description: Retrieve Mappls API access token
- Response: { access_token, token_type, expires_in }
```

#### **Mapping & Directions**
```
GET /api/get-directions
- Parameters: origin, destination, profile, resource
- Description: Get route between two points
- Response: Route geometry, distance, duration

GET /api/get-directions-multi
- Parameters: path (semicolon-separated coordinates)
- Description: Multi-location routing optimization
- Response: Complete route with multiple waypoints
```

#### **Places & Search**
```
GET /api/google-place-search
- Parameters: input, lat, lng
- Description: Search places using Google Places API (New)
- Response: Place details with photos and coordinates
```

#### **AI Integration**
```
POST /stream-itinerary
- Body: { user_prompt }
- Description: Stream AI-generated travel itineraries
- Response: Server-sent events with streaming content
```

---

## 📁 **Project Structure**

```
jharkhandExpress/
├── frontend/                   # React TypeScript Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Cart.tsx       # Shopping cart functionality
│   │   │   ├── ProductModal.tsx # Product detail modal
│   │   │   ├── LocationCard.tsx # Map location cards
│   │   │   └── FeatureComponent.tsx # Travel features
│   │   ├── context/           # React Context providers
│   │   │   └── CartContext.tsx # Global cart state management
│   │   ├── pages/            # Main application pages
│   │   │   ├── Home.tsx      # Landing page
│   │   │   ├── ChatBot.tsx   # AI chat interface
│   │   │   ├── JharkhandTreasure.tsx # Commerce platform
│   │   │   ├── Dashboard.tsx # Analytics dashboard
│   │   │   └── DirectionBetweenMultiple.tsx # Map routing
│   │   ├── types.ts          # TypeScript type definitions
│   │   └── dataForCommerce.ts # Product catalog data
│   ├── public/               # Static assets and images
│   └── package.json          # Frontend dependencies
│
├── backend/                   # Express TypeScript Backend
│   ├── src/
│   │   └── index.ts          # Main server file with all routes
│   ├── package.json          # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
│
└── README.md                 # Project documentation
```

---

## 🎨 **Design System**

### **Color Themes**
The application supports multiple color themes for user customization:

- **Default Theme**: Warm earth tones reflecting Jharkhand's natural beauty
- **Forest Theme**: Green palette inspired by Jharkhand's forests
- **Sunset Theme**: Orange and pink gradients mimicking tribal art
- **Ocean Theme**: Blue variations for calming experiences

### **Typography**
- **Primary Font**: Inter for modern, clean readability
- **Fallback**: System fonts for cross-platform compatibility
- **Responsive Scaling**: Fluid typography adapting to screen sizes

### **Component Design**
- **Cards**: Consistent shadow, border-radius, and hover effects
- **Buttons**: Multiple variants with proper accessibility states
- **Forms**: Clear validation and user feedback
- **Navigation**: Intuitive routing with breadcrumbs

---

## 🔧 **Configuration**

### **Environment Variables**

#### **Frontend (.env.local)**
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### **Backend (.env)**
```env
MAPPLS_CLIENT_ID=your_mappls_client_id
MAPPLS_CLIENT_SECRET=your_mappls_client_secret
MAPPLS_REST_API_KEY=your_mappls_rest_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### **API Keys Setup**

1. **Google Maps API**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API, Places API (New), Street View Static API
   - Create credentials and add to environment

2. **Mappls API**
   - Register at [Mappls API Console](https://apis.mappls.com/)
   - Generate Client ID, Secret, and REST API Key
   - Add to backend environment

---

## 🚀 **Deployment**

### **Production Build**

#### **Frontend**
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

#### **Backend**
```bash
cd backend
npm run build    # If you add a build script
npm start        # Production server
```

### **Deployment Options**

- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Render, or cloud platforms
- **Database**: For future expansion with PostgreSQL/MongoDB

---

## 📈 **Performance Optimizations**

### **Frontend Optimizations**
- **Code Splitting**: Lazy loading for route-based components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack bundle analyzer for optimization
- **Caching**: Browser caching for static assets

### **Backend Optimizations**
- **CORS Configuration**: Specific origin allowlist
- **Compression**: Gzip compression for responses
- **Rate Limiting**: API rate limiting for production
- **Logging**: Structured logging for monitoring

---

## 🧪 **Testing Strategy**

### **Frontend Testing**
- **Unit Tests**: Jest and React Testing Library
- **Component Tests**: Individual component functionality
- **Integration Tests**: User workflow testing
- **E2E Tests**: Playwright for full application testing

### **Backend Testing**
- **API Tests**: Supertest for endpoint testing
- **Unit Tests**: Individual function testing
- **Integration Tests**: Database and external API integration

---

## 🔒 **Security Considerations**

### **API Security**
- **Environment Variables**: Secure API key management
- **CORS Policy**: Restricted cross-origin requests
- **Input Validation**: Sanitized user inputs
- **Rate Limiting**: API abuse prevention

### **Data Protection**
- **No Sensitive Storage**: Client-side security practices
- **HTTPS Enforcement**: Secure communication protocols
- **API Key Rotation**: Regular credential updates

---

## 🤝 **Contributing**

We welcome contributions from the community! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper commit messages
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request with detailed description

### **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent code formatting
- Write tests for new features

### **Code Style**
- **Frontend**: ESLint configuration with React rules
- **Backend**: Prettier for consistent formatting
- **Commits**: Conventional commit messages

---

## 📋 **Future Roadmap**

### **Phase 1: Enhanced Features**
- [ ] User authentication and profiles
- [ ] Booking integration with hotels/transport
- [ ] Offline mode capabilities
- [ ] Push notifications

### **Phase 2: Advanced AI**
- [ ] Voice-based trip planning
- [ ] Image recognition for landmarks
- [ ] Predictive travel recommendations
- [ ] Multi-language support

### **Phase 3: Platform Expansion**
- [ ] Mobile app development (React Native)
- [ ] Admin panel for content management
- [ ] Payment gateway integration
- [ ] Social sharing features

### **Phase 4: Ecosystem Integration**
- [ ] Government tourism portal integration
- [ ] Local business partnerships
- [ ] Tour guide marketplace
- [ ] Weather and event integration

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 👥 **Team & Acknowledgments**

### **Development Team**
- **Full Stack Development**: React, TypeScript, Express expertise
- **UI/UX Design**: Modern design principles and user experience
- **API Integration**: External service integration and optimization
- **Tourism Domain**: Local knowledge and cultural understanding

### **Special Thanks**
- Smart India Hackathon 2025 organizers
- Jharkhand Tourism Department for inspiration
- Open source community for amazing tools and libraries
- Local artisans and cultural experts for authentic content

---

## 📞 **Support & Contact**

### **Technical Support**
- **Issues**: [GitHub Issues](https://github.com/samarJ19/jharkhandExpress/issues)
- **Discussions**: [GitHub Discussions](https://github.com/samarJ19/jharkhandExpress/discussions)
- **Documentation**: This README and inline code comments

### **Business Inquiries**
- **Email**: contact@jharkhandexpress.com
- **Partnership**: partnerships@jharkhandexpress.com
- **Press**: press@jharkhandexpress.com

---

## 🌟 **Star History**

If you find this project helpful, please consider giving it a star! ⭐

---

**Built with ❤️ for Smart India Hackathon 2025**

*Empowering Jharkhand Tourism Through Technology*