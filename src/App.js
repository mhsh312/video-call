import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CallPage from "./pages/CallPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/call/:mode/:callId" element={<CallPage />} />
    </Routes>
  );
}

export default App;
