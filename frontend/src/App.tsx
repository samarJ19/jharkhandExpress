import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chatbot from './pages/ChatBot';
import JharkhandTreasuresPage from './pages/JharkhandTreasure';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} /> {/*Home page/landing page */}
        <Route path="/chat" element={<Chatbot />} />
        <Route path='/jharkhand-treasures' element={<JharkhandTreasuresPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App