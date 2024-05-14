import { Outlet } from "react-router-dom";
import Main from "../components/dashboard/layout/Main";
import Sidebar from "../components/dashboard/layout/Sidebar";
import Topbar from "../components/dashboard/layout/Topbar";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden ">
      <Topbar />
      <div className="flex flex-1 w-screen h-full ">
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
};

export default Dashboard;
