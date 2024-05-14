import {
  ArrowLeftIcon,
  DocumentTextIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "../../ui/utils/Loader";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authAtom from "../../../recoil/atoms/authAtom";
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

const Page = () => {
  const { lead_number } = useParams();
  const { token } = useRecoilValue(authAtom);
  const { isPending, data } = useQuery({
    queryKey: ["getlead", token, lead_number],
    queryFn: () => QueryFn(token, lead_number),
  });

  if (isPending) return <Loader />;
  return (
    <div className="flex-1 bg-[#f3f5fb] py-5 w-full min-h-full flex flex-col gap-5">
      {/* ----------- up -_________ */}
      <div className="px-10 pt-7 bg-whit w-full bg-white">
        <div className="flex gap-2 w-full justify-between items-start">
          <div>
            <Link to={"/tracker"}>
              <ArrowLeftIcon className="w-5 h-5 mt-2" />
            </Link>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold">
                {data?.applicant_firstname} {data?.applicant_lastname}
              </h1>
              {data?.status === "generated" ? (
                <div className="py-1 px-3 bg-green-100 text-green-500 border border-green-500 rounded-lg text-center">
                  Generated
                </div>
              ) : (
                <div className="py-1 px-3 bg-purple-100 text-purple-500 border border-purple-500 rounded-lg text-center">
                  Acknowledged
                </div>
              )}
            </div>
            <div className=" mt-2 w-full flex gap-5">
              <span className="flex-1 line-clamp-1">
                {data?.applicant_address1}, {data?.applicant_address2},{" "}
                {data.district}, {data.state}, {data.pincode}
              </span>
              <span>·</span>
              <span>+91 {data.applicant_number} </span>
            </div>
          </div>
        </div>
        <div className=" flex">
          <div className="py-5 border-b-4 border-navanc-secondary px-5">
            Details
          </div>
        </div>
      </div>
      {/* ---------------- down --------------- */}
      <div className="bg-white mx-5 px-8 rounded-lg py-5">
        {/* personal details  */}
        <div className="flex md:flex-row flex-col py-7 items-start">
          <div className="lg:w-96 md:w-56  wflex items-center gap-2">
            {" "}
            <UserIcon className="w-6 h-6 text-navanc-secondary" />{" "}
            <span>Personal Details</span>
          </div>
          <div className="flex-1">
            <div className="md:flex items-center gap-2 hidden">
              {" "}
              <UserIcon className="w-6 h-6 text-navanc-secondary" />{" "}
              <span>Personal Details</span>
            </div>
            <div className="mx-8 w-full grid grid-cols-3 mt-7">
              <div>
                <p className="text-gray-400">First Name</p>
                <p>{data.applicant_firstname}</p>
              </div>
              <div>
                <p className="text-gray-400">Last Name</p>
                <p>{data.applicant_lastname}</p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Residential details  */}
        <div className="flex items-start md:flex-row flex-col  py-7 border-t">
          <div className="lg:w-96 md:w-56 flex items-center gap-2">
            {" "}
            <HomeIcon className="w-6 h-6 text-navanc-secondary" />{" "}
            <span>Residential Details</span>
          </div>
          <div className="flex-1 ">
            <div className="md:flex items-center gap-2 hidden">
              {" "}
              <HomeIcon className="w-6 h-6 text-navanc-secondary" />{" "}
              <span>Residential Details</span>
            </div>
            <div className="mx-8 w-full grid grid-cols-3 mt-7">
              <div className="">
                {data?.applicant_address1}, {data?.applicant_address2},{" "}
                {data.district}, {data.state}, {data.pincode}
              </div>
            </div>
          </div>
        </div>
        {/* Document Upload  */}
        <div className="flex md:flex-row flex-col items-start py-7 border-t">
          <div className="lg:w-96 md:w-56 flex items-center gap-2">
            {" "}
            <DocumentTextIcon className="w-6 h-6 text-navanc-secondary" />{" "}
            <span>Documents</span>
          </div>
          <div className="flex-1 space-y-7">
            <div className="md:flex items-center gap-2 hidden">
              {" "}
              <DocumentTextIcon className="w-6 h-6 text-navanc-secondary" />{" "}
              <span>Documents</span>
            </div>
            <div className="mx-8 w-full mt-7">
              <div className="">
                <p className="text-gray-500">
                  Document contains following sub documents
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div>&nbsp;</div>
    </div>
  );
};

export default Page;
