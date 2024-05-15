import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import authAtom from "../../../recoil/atoms/authAtom";
import { useRecoilValue } from "recoil";

const Dropdown = ({ handleUpdate, lead_number }) => {
  const { token } = useRecoilValue(authAtom);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdateStatus = () => {
    handleUpdate(lead_number, token);
    toggleDropdown();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="py-1 px-2 sm:px-5 bg-green-50 border border-green-500 rounded-lg text-green-500 flex gap-3 relative items-center min-w-40 text-center justify-center w-full"
        onClick={toggleDropdown}
      >
        <span>Generated</span> <ChevronDownIcon className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute bg-white rounded-lg z-50 border p-3 w-full -bottom-28">
          <div className=" flex flex-col text-center gap-2">
            <div
              className="badge py-1.5 px-5 rounded-lg border text-green-500 bg-green-50 border-green-500 w-full  cursor-pointer"
              onClick={toggleDropdown}
            >
              Generated
            </div>
            <div
              className="badge py-1.5 px-3 rounded-lg border text-purple-500 bg-purple-50 border-purple-500 w-full cursor-pointer"
              onClick={handleUpdateStatus}
            >
              Acknowledge
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
