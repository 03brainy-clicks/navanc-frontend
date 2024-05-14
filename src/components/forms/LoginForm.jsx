import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NormalInputField from "../ui/forms/NormalInputField";
import GradientButton from "../ui/forms/GradientButton";
import toast from "react-hot-toast";
import { validatePassword, validateUsername } from "../../Validation";
import authAtom from "../../recoil/atoms/authAtom";
import { useSetRecoilState } from "recoil";

const LoginForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const setAuthState = useSetRecoilState(authAtom)
  const navigate = useNavigate();

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    try {
      if (validateUsername(username) && validatePassword(password)) {
        const response = await axios.post("http://localhost:8080/auth/login", {
          username,
          password,
        });
        const data = response.data;
        setAuthState(data)
        setLoading((prev) => !prev);
        toast.success("Login Successful");
        navigate("/tracker");
      } else {
        toast.error("Invalid Credentials");
        setLoading((prev) => !prev);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <form className="space-y-3 mt-5">
      <NormalInputField
        value={username}
        setValue={setUsername}
        placeholder="Username"
      />
      <NormalInputField
        type="password"
        value={password}
        setValue={setPassword}
        placeholder="Password"
      />
      <GradientButton
        title={"Login"}
        handleClick={handleLogin}
        loading={loading}
        classes="w-full"
      />
    </form>
  );
};

export default LoginForm;
