import { DocumentIcon, HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import TextField from "../components/ui/forms/TextField";
import { useState } from "react";
import NumberField from "../components/ui/forms/NumberField";
import DropDown from "../components/ui/forms/DropDown";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

const CreateLead = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState({});
  const [distric, setDistrict] = useState({});
  const [documentType,setDocumentType] = useState("")

  return (
    <div className="w-screen min-h-screen  rounded-lg p-8 flex items-center justify-center bg-[#f3f5fb]">
      <div className="w-full h-full flex-1 bg-white px-12 py-10 rounded-lg">
        <div className="pb-8">
          <h1 className="text-xl font-semibold">Lead Details</h1>
          <p className="text-gray-500 mt-1">
            Fill the details below to create the leads{" "}
          </p>
        </div>
        <div>
          <div className=" flex  py-10 border-t">
            <div className="w-96 flex items-start gap-2 mt-1">
              <UserIcon className="w-7 h-7 text-navanc-primary" />
              <span className="text-lg">Personal Details</span>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-7">
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
          <div className=" flex  py-10 border-t">
            <div className="w-96 flex items-start gap-2 mt-1">
              <HomeIcon className="w-7 h-7 text-navanc-primary" />
              <span className="text-lg">Residential Details</span>
            </div>
            <div className="flex-1 flex flex-col gap-7">
              <div className="grid grid-cols-2 gap-7">
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
              <div className="grid grid-cols-3 gap-7">
                <TextField
                  label={"Pincode"}
                  value={mobile1}
                  setValue={setMobile1}
                />
                <DropDown
                  title={"State"}
                  required={true}
                  value={state}
                  setValue={setState}
                />{" "}
                <DropDown title={"District"} required={true} value={state} />
              </div>
            </div>
          </div>
          <div className=" flex  pt-10 border-t">
            <div className="w-96 flex items-start gap-2 mt-1">
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
              <div className="py-7">hello</div>
              <div className="">
                <button className="gradientBtn2 py-3 px-5 w-1/2">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLead;
