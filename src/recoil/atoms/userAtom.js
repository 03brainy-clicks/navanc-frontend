import { atom } from "recoil";

// Define initial value
const initialAuthState = {
  username: "",
  name: "",
};

// Define authentication atom
const userAtom = atom({
  key: "userState",
  default: initialAuthState,
});

export default userAtom;
