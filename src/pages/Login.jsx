import {
  DevicePhoneMobileIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { validatePassword, validateUsername } from "../Validation";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "../recoil/atoms/authAtom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userAtom from "../recoil/atoms/userAtom";
import Loader from "../components/ui/utils/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useRecoilValue(authAtom);
  const setAuthState = useSetRecoilState(authAtom);
  const setUserState = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  // * handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    try {
      if (validateUsername(username) && validatePassword(password)) {
        const response = await axios.post(`${url}/auth/login`, {
          username,
          password,
        });
        const data = response.data;
        setAuthState(data.auth);
        setUserState(data.userDetails);
        setIsLoading((prev) => !prev);
        toast.success("Login Successful");
        navigate("/tracker");
      } else {
        toast.error("Invalid Credentials");
        setIsLoading((prev) => !prev);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-navanc-bgAuth p-5">
      <div className="p-12 bg-white rounded-xl h-full lg:w-1/2  md:w-2/3">
        <div className=" flex flex-col  h-full justify-between mx-auto lg:w-3/4  md:w-4/5">
          <div></div>
          <div className="space-y-10">
            <div>
              <DevicePhoneMobileIcon className="w-14" />
              <h3 className="text-2xl font-bold text-navanc-textPrimary nunito mt-5">
                Login to Navanc
              </h3>
              <p className="text-navanc-textSecondary mt-2 font-medium ">
                Enter your details to get started
              </p>
            </div>
            <form className="space-y-3">
              <input
                type="text"
                className="py-2 border px-3 rounded-lg w-full"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="py-2 border px-3 rounded-lg w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="gradientBtn w-full" onClick={handleLogin}>
                <div>{isLoading && <Loader />}</div> Submit
                <div></div>
              </button>
            </form>
          </div>
          <div className="flex mt-10">
            <span className="flex gap-1 items-center cursor-pointer hover:text-navanc-primary animate">
              <LifebuoyIcon className="w-6 h-6" />
              <span>Need Help?</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
