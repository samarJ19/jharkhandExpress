import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/ChatBot";
import JharkhandTreasuresPage from "./pages/JharkhandTreasure";
import StreetViewMap from "./pages/StreetView";
import Dashboard from "./pages/Dashboard";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
