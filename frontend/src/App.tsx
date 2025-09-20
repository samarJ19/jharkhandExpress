import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/ChatBot";
import JharkhandTreasuresPage from "./pages/JharkhandTreasure";
import StreetViewMap from "./pages/StreetView";
import Dashboard from "./pages/Dashboard";
import AdminTourGuide from "./Component/AdminTourGuide";
import GuideList from "./Component/GuideList";
import Login from "./pages/Login";
import TourGuideRegistration from "./pages/TourGuideRegestration";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/*Home page/landing page */}
          <Route path="/chat" element={<Chatbot />} />
          <Route
            path="/jharkhand-treasures"
            element={<JharkhandTreasuresPage />}
          />
          <Route path="/street-view" element={<StreetViewMap />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/adminTourGuide' element={<AdminTourGuide />} />
          <Route path="/publicTourGuides" element={<GuideList />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/tourGuideRegistration" element={<TourGuideRegistration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
