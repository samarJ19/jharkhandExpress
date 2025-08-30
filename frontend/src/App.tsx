import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import MapplsLocationMarker from "./pages/SingleMap";
import Chatbot from "./pages/ChatBot";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />{" "}
                    {/*Home page/landing page */}
                    <Route
                        path="/singlemarker"
                        element={
                            <MapplsLocationMarker
                                token="djuliriwwyhwhjympauyjcpueskqakjyzryd"
                                defaultCenter={[28.61, 77.23]} // Optional: Delhi coordinates
                                defaultZoom={10} // Optional
                                markerIconUrl="https://apis.mapmyindia.com/map_v3/1.png" // Optional
                            />
                        }
                    />
                    <Route path="/chat" element={<Chatbot />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
