import { atom } from "recoil";

// Define initial value
const initialAuthState = {
  token: "",
  username: "",
  user_id: null,
  role: "",
  name:""
};

// Define authentication atom
const authAtom = atom({
  key: "authState",
  default: initialAuthState,
});

export default authAtom;
