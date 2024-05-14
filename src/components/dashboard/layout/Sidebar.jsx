import {
  ArrowRightStartOnRectangleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Modal from "../../ui/utils/Modal";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import authAtom from "../../../recoil/atoms/authAtom";
import userAtom from "../../../recoil/atoms/userAtom";

const Sidebar = () => {
  const [toggle, setToggle] = useState();
  const navigate = useNavigate();
  const auth = useSetRecoilState(authAtom);
  const user = useSetRecoilState(userAtom);
  const handleLogout = () => {
    auth({
      token: "",
      username: "",
      user_id: null,
      role: "",
      name: "",
      url: "https://navanc-backend.onrender.com",
    });
    user({ username: "", name: "" });
    navigate("/");
  };

  return (
    <>
      <div className="p-4 py-10 h-full bg-navanc-darkpurple text-navanc-textTertiary text-sm space-y-7 hidden sm:block">
        <div className=" cursor-pointer text-white">
          <DocumentTextIcon className="w-5 h-5 mx-auto mb-1" />
          <span>Tracker</span>
        </div>
        <div
          className=" cursor-pointer hover:text-gray-300 animate"
          onClick={() => setToggle((prev) => !prev)}
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 mx-auto mb-1" />
          <span>Logout</span>
        </div>
      </div>
      <Modal isOpen={toggle} onClose={setToggle}>
        <div className="w-96">
          <h1 className="text-center text-navanc-textPrimary text-xl font-bold">
            Logout
          </h1>
          <h1 className="text-center text-xl font-semibold my-7">
            Are you sure yout want to logout?
          </h1>
          <div className="flex gap-5 items-center w-full ">
            <button
              className="py-2 flex-1 border rounded-lg w-1/2 border-red-500 text-red-500 font-medium"
              onClick={() => setToggle((prev) => !prev)}
            >
              Cancel
            </button>
            <button
              className="flex-1 gradientBtn2 py-2 border"
              onClick={handleLogout}
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
