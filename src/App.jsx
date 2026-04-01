import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import ViewApplication from "./components/ViewApplication";
import PortalDown from "./components/PortalDown";
import SubmissionClosed from "./components/SubmissionClosed";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={<PortalDown />} /> */}
        <Route path="/" element={<SubmissionClosed />} />
        {/* <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/view-application" element={<ViewApplication />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
