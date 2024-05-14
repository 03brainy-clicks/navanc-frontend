import { useState } from "react";
import {
  ChevronDownIcon,
  EyeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useRecoilState } from "recoil";
import authAtom from "../../../recoil/atoms/authAtom";
import { Link } from "react-router-dom";

const Row = ({
  name,
  residence,
  contact,
  status,
  lead_number,
  handleUpdateStatus,
}) => {
  const [toggle, setToggle] = useState(false);
  const auth = useRecoilState(authAtom);

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:8080/lead/status/${lead_number}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    handleUpdateStatus(lead_number);
    setToggle((prev) => !prev);
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
          {auth?.role === "admin" && status === "generated" ? (
            <button
              className="py-1 px-2 sm:px-5  bg-green-50 border border-green-500 rounded-lg text-green-500  flex gap-3 relative items-center w-40 "
              onClick={() => setToggle((prev) => !prev)}
            >
              <span> Generated</span> <ChevronDownIcon className="w-5 h-5 " />
            </button>
          ) : (
            <>
              {status !== "generated" ? (
                <button className="py-1 px-2 sm:px-6  bg-purple-50 border border-purple-500 rounded-lg text-purple-500 w-40">
                  Acknowledged
                </button>
              ) : (
                <>
                  {" "}
                  <button className="py-1 px-2 sm:px-5 bg-green-50 border border-green-500 rounded-lg text-green-500 w-40">
                    Generated
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </td>
      <td className="flex gap-3 items-center px-2 py-5">
        <Link href={`/tracker/updatelead/${lead_number}`}>
          <div className="py-2 px-2 border rounded-lg">
            <PencilSquareIcon className="w-5 h-5" />
          </div>
        </Link>
        <Link href={`/tracker/view/${lead_number}`}>
          <div className="py-2 px-2 border rounded-lg">
            <EyeIcon className="w-5 h-5" />
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default Row;
