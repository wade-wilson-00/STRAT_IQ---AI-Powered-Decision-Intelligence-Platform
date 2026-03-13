import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Revenue from "./pages/Revenue.jsx";
import Churn from "./pages/Churn.jsx";
import Advisor from "./pages/Advisor.jsx";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-strat-bg text-slate-100 antialiased">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/churn" element={<Churn />} />
            <Route path="/advisor" element={<Advisor />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
