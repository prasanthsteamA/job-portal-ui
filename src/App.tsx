import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import JobPage from "./pages/JobPage";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./components/Signup";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
          <Route path="/jobpage" element={<JobPage />} />
        </Route>      
          <Route path="*" element={<Navigate to="/" />} />      
      </Routes>
    </Router>
  );
};

export default App;
