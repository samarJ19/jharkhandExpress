import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapplsLocationMarker from './pages/SingleMap';



function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} /> {/*Home page/landing page */}
          <Route path="/singlemarker" element={<MapplsLocationMarker 
        />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
