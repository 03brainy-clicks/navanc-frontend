import {
  ArrowRightStartOnRectangleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="p-4 py-10 h-full bg-navanc-darkpurple text-navanc-textTertiary text-sm space-y-7 hidden sm:block">
      <div className=" cursor-pointer text-white">
        <DocumentTextIcon className="w-5 h-5 mx-auto mb-1" />
        <span>Tracker</span>
      </div>
      <div
        className=" cursor-pointer hover:text-navanc-textSecondary animate"
        onClick={() => setToggle((prev) => !prev)}
      >
        <ArrowRightStartOnRectangleIcon className="w-5 h-5 mx-auto mb-1" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
