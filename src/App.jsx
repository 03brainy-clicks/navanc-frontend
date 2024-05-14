import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UpdateLead from "./components/dashboard/sub-pages/UpdateLead";
import ViewLead from "./components/dashboard/sub-pages/ViewLead";
import Leads from "./components/dashboard/sub-pages/Leads";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateLead from "./pages/CreateLead";
const queryClient = new QueryClient();
const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Router>
            <Routes>
              <Route element={<Login />} path="/" />
              <Route element={<CreateLead />} path="/createLead" />
              <Route path="/tracker/*" element={<Dashboard />}>
                <Route path="" element={<Leads />} />
                <Route path="updatelead" element={<UpdateLead />} />
                <Route path="viewlead" element={<ViewLead />} />
              </Route>
            </Routes>
          </Router>
        </RecoilRoot>
      </QueryClientProvider>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;
