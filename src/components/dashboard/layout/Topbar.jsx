import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../../recoil/atoms/userAtom";
import { useState } from "react";
import Modal from "../../ui/utils/Modal";
import authAtom from "../../../recoil/atoms/authAtom";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { name } = useRecoilValue(userAtom);
  const [toggle, setToggle] = useState(false);
  const auth = useSetRecoilState(authAtom);
  const user = useSetRecoilState(userAtom);
  const navigate = useNavigate();
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
      <div className="p-5 py-4 flex justify-between items-center text-sm w-screen ">
        <div className="text-lg nunito font-bold">Navanc</div>
        <div className="gap-2 flex items-center">
          <div>Hi, {name}</div>
          <div className="sm:hidden block">
            <ArrowRightStartOnRectangleIcon
              className="w-5"
              onClick={() => setToggle(!toggle)}
            />
          </div>
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

export default Topbar;
