import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chatbot from './pages/ChatBot';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} /> {/*Home page/landing page */}
        <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </Router>
    </>
  )
}

export default App