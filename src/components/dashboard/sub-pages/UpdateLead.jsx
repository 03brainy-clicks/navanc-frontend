import { DocumentIcon, HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../../ui/forms/TextField";
import DropDown from "../../ui/forms/DropDown";
import NumberField from "../../ui/forms/NumberField";
import { Districts, States } from "../../../db";
import authAtom from "../../../recoil/atoms/authAtom";
import Loader from "../../ui/utils/Loader";
import { useQuery } from "@tanstack/react-query";

const QueryFn = async (token, lead_number) => {
  const response = await axios.get(
    `https://navanc-backend.onrender.com/leads/${lead_number}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.lead;
};

const CreateLead = () => {
  const { lead_number } = useParams();
  const { token } = useRecoilValue(authAtom);
  const { isPending, data } = useQuery({
    queryKey: ["updatelead", token, lead_number],
    queryFn: () => QueryFn(token, lead_number),
  });

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
          applicant_firstname: firstname,
          applicant_lastname: lastname,
          applicant_number: mobile1,
          applicant_number2: mobile2,
          applicant_address1: address,
          applicant_address2: address2,
          district: district.title,
          state: state.title,
          pincode: pincode,
        };

        await axios.put(
          `https://navanc-backend.onrender.com/leads/${lead_number}`,
          leadData,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setIsLoading((prev) => !prev);
        toast.success("Lead Updated");
        navigate("/tracker");
      } else {
        console.error("All fields are required");
        toast("All fields are required");
        setIsLoading((prev) => !prev);
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      setIsLoading((prev) => !prev);
    }
  };

  useEffect(() => {
    if (data) {
      setFirstname(data.applicant_firstname);
      setLastName(data.applicant_lastname);
      setAddress(data.applicant_address1);
      setAddress2(data.applicant_address2);
      setMobile1(data.applicant_number);
      setMobile2(data.applicant_address2);
      setPincode(data.pincode);
      setState({
        title: data.state,
        value: data.state.split(" ").join("").toLowerCase(),
      });
      setDistrict({
        title: data.district,
        value: data.district.split(" ").join("").toLowerCase(),
      });
    }
  }, [data]);

  return (
    <div className="w-full  rounded-lg p-8 flex items-center justify-center bg-[#f3f5fb]">
      <div className="w-full h-full flex-1 bg-white px-12 py-10 rounded-lg">
        <div className="pb-8">
          <h1 className="text-xl font-semibold">Lead Details</h1>
          <p className="text-gray-500 mt-1">
            Fill the details below to create the leads{" "}
          </p>
        </div>
        {isPending ? (
          <Loader />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default CreateLead;
