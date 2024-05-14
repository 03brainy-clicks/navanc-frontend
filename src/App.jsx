import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route element={<Dashboard />} path="/tracker" />
            <Route element={<Login />} path="/" />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
