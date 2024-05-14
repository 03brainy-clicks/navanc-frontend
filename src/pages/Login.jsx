import {
  DevicePhoneMobileIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-navanc-bgAuth md:p-5">
      <div className="p-12 bg-white rounded-xl lg:w-1/3  md:w-2/3 sm:w-3/4 w-full h-full sm:h-auto ">
        <div className=" flex flex-col  h-full justify-between mx-auto ">
          <div></div>
          <div className="space-y-10">
            <div>
              <DevicePhoneMobileIcon className="w-12" />
              <h3 className="text-2xl font-bold text-navanc-textPrimary nunito mt-5">
                Login to XYZ
              </h3>
              <p className="text-navanc-textSecondary mt-2 font-medium ">
                Enter your details to get started
              </p>
            </div>
            <LoginForm />
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
