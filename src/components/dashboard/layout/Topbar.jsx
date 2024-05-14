import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Topbar = () => {


  return (
    <div className="p-5 py-4 flex justify-between items-center text-sm w-screen">
      <div className="text-lg nunito font-bold">XYZ</div>
      <div className="gap-5 flex items-center">
        <div>Hi</div>
        <div className="sm:hidden block">
          <ArrowRightStartOnRectangleIcon
            className="w-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
