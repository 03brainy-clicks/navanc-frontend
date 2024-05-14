import { DocumentIcon, HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import TextField from "../components/ui/forms/TextField";
import { useState } from "react";
import NumberField from "../components/ui/forms/NumberField";
import DropDown from "../components/ui/forms/DropDown";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { Districts, States } from "../db";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import authAtom from "../recoil/atoms/authAtom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/ui/utils/Loader";

const CreateLead = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState({
    value: "",
    title: "",
  });
  const [district, setDistrict] = useState({
    value: "",
    title: "",
  });
  const [documentType, setDocumentType] = useState("");
  const auth = useRecoilValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateLead = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    try {
      if (
        firstname &&
        lastname &&
        address &&
        mobile1 &&
        state.title &&
        district.title
      ) {
        const leadData = {
          lead_number: uuidv4(),
          applicant_firstName: firstname,
          applicant_lastName: lastname,
          applicant_number: mobile1,
          applicant_number2: mobile2,
          applicant_address1: address,
          applicant_address2: address2,
          distric: district.title,
          state: state.title,
          pincode: pincode,
          generated_by_id: auth.user_id,
        };

        await axios.post(
          "https://navanc-backend.onrender.com/leads/",
          leadData,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setIsLoading((prev) => !prev);
        toast.success("Lead Generated");
        navigate("/tracker");
      } else {
        console.error("All fields are required");
        toast("All fields are required");
        setIsLoading((prev) => !prev);
      }
    } catch (error) {
      console.error("Error creating lead:", error);
      setIsLoading((prev) => !prev);
    }
  };

  return (
    <div className="w-screen min-h-screen  rounded-lg p-8 flex items-center justify-center bg-[#f3f5fb]">
      <div className="w-full h-full flex-1 bg-white px-12 py-10 rounded-lg">
        <div className="pb-8">
          <h1 className="text-xl font-semibold">Lead Details</h1>
          <p className="text-gray-500 mt-1">
            Fill the details below to create the leads{" "}
          </p>
        </div>
        <form>
          <div className=" flex lg:flex-row flex-col lg:gap-0 gap-5  py-10 border-t">
            <div className="lg:w-96 flex items-start gap-2 mt-1">
              <UserIcon className="w-7 h-7 text-navanc-primary" />
              <span className="text-lg">Personal Details</span>
            </div>
            <div className="flex-1 grid md:grid-cols-2 md:gap-7 gap-5">
              <TextField
                label={"First name"}
                required={true}
                value={firstname}
                setValue={setFirstname}
              />
              <TextField
                label={"Last name"}
                required={true}
                value={lastname}
                setValue={setLastName}
              />
              <NumberField
                label={"Mobile number"}
                required={true}
                value={mobile1}
                setValue={setMobile1}
              />
              <NumberField
                label={"Alternate contact number"}
                value={mobile2}
                setValue={setMobile2}
              />
            </div>
          </div>
          <div className=" flex lg:flex-row flex-col lg:gap-0 gap-5  py-10 border-t">
            <div className="lg:w-96 flex items-start gap-2 mt-1">
              <HomeIcon className="w-7 h-7 text-navanc-primary" />
              <span className="text-lg">Residential Details</span>
            </div>
            <div className="flex-1 flex flex-col md:gap-7 gap-5">
              <div className="flex-1 grid md:grid-cols-2 md:gap-7 gap-5">
                <TextField
                  label={"Address line 1"}
                  required={true}
                  value={address}
                  setValue={setAddress}
                />
                <TextField
                  label={"Address line 2"}
                  value={address2}
                  setValue={setAddress2}
                />
              </div>
              <div className="grid md:grid-cols-3 md:gap-7 gap-5">
                <TextField
                  label={"Pincode"}
                  value={pincode}
                  setValue={setPincode}
                />
                <DropDown
                  title={"State"}
                  required={true}
                  options={States}
                  value={state}
                  setValue={setState}
                />{" "}
                <DropDown
                  title={"District"}
                  options={Districts[state.value]}
                  required={true}
                  disabled={!state.value && true}
                  value={district}
                  setValue={setDistrict}
                />
              </div>
            </div>
          </div>
          <div className=" flex lg:flex-row flex-col lg:gap-0 gap-5  py-10 border-t">
            <div className="lg:w-96 flex items-start gap-2 mt-1">
              <DocumentIcon className="w-7 h-7 text-navanc-primary" />
              <span className="text-lg"> Document</span>
            </div>
            <div className="flex-1">
              <div className="flex-1 flex gap-7 items-center">
                <div className="flex-1">
                  {" "}
                  <TextField
                    label={"Document Type"}
                    required={true}
                    value={documentType}
                    setValue={setDocumentType}
                    className={"w-full"}
                  />
                </div>
                <button className="gradientBtn2 py-2 px-3 mt-2">
                  <ArrowUpOnSquareIcon className="w-7 h-7" />
                </button>
              </div>
              <div className="py-7"></div>
              <div className="">
                <button
                  className="gradientBtn2 py-3 px-5 md:w-1/2 w-full flex items-center gap-2"
                  onClick={handleCreateLead}
                >
                  {isLoading && <Loader />} <span>Submit</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLead;
