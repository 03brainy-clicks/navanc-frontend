import { useState } from "react";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRecoilState } from "recoil";
import authAtom from "../../../recoil/atoms/authAtom";
import { Link } from "react-router-dom";
import Dropdown from "../../ui/utils/Dropdown";
import toast from "react-hot-toast";

const Row = ({
  name,
  residence,
  contact,
  status,
  lead_number,
  handleUpdateStatus,
}) => {
  const {role} = useRecoilState(authAtom);

  const handleUpdate = async (lead, token) => {
    try {
      await axios.put(
        `https://navanc-backend.onrender.com/leads/status/${lead}`,
        "",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleUpdateStatus(lead);
      toast("Status Updated");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <tr className="text-gray-500 font-normal border-b">
      <td className="font-semibold px-2 py-5 ">{name}</td>
      <td className="px-2 py-5">
        <span className="line-clamp-1">{residence}</span>
      </td>
      <td className="px-2 py-5">+91 {contact}</td>
      <td className="px-2 py-5">
        <div className="relative">
          {role=== "admin" && status === "generated" ? (
            <div className=" relative">
              <Dropdown handleUpdate={handleUpdate} lead_number={lead_number} />
            </div>
          ) : (
            <>
              {status !== "generated" ? (
                <button className="py-1 px-2 sm:px-6  bg-purple-50 border border-purple-500 rounded-lg text-purple-500 min-w-48">
                  Acknowledged
                </button>
              ) : (
                <>
                  <button className="py-1 px-2 sm:px-5 bg-green-50 border border-green-500 rounded-lg text-green-500 min-w-48 ">
                    Generated
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </td>
      <td className="flex gap-3 items-center px-2 py-5">
        <Link to={`/tracker/updatelead/${lead_number}`}>
          <div className="py-2 px-2 border rounded-lg">
            <PencilSquareIcon className="w-5 h-5" />
          </div>
        </Link>
        <Link to={`/tracker/viewlead/${lead_number}`}>
          <div className="py-2 px-2 border rounded-lg">
            <EyeIcon className="w-5 h-5" />
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default Row;
