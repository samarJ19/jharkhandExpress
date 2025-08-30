import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapplsLocationMarker from './pages/SingleMap';
import Chatbot from './pages/ChatBot';
import MapplsMultipleMarkers from './pages/MultipleMarker';
import DirectionsMap from './pages/DirectionBetween';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} /> {/*Home page/landing page */}
          <Route path="/singlemarker" element={<MapplsLocationMarker />} />
          <Route path="/multiplemarker" element={<MapplsMultipleMarkers />} />
          <Route path="/direction" element={<DirectionsMap />} />
        <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </Router>
    </>
  )
}

export default App