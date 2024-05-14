import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef } from "react";

const DropDown = ({ options, value, setValue, title, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelect = (value) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <fieldset className="rounded-lg border text-navanc-textTertiary">
        <legend className=" ml-3 px-1 text-sm">{title}</legend>
        <button
          className="w-full flex items-center justify-between py-2 px-2 cursor-pointer"
          type="button"
          onClick={handleOpen}
          disabled={disabled}
        >
          <span>{value && value.title}</span>
          <span>
            {open ? (
              <ChevronUpIcon className="w-5" />
            ) : (
              <ChevronDownIcon className="w-5" />
            )}
          </span>
        </button>
      </fieldset>
      {open && (
        <div className="absolute bg-white w-full shadow-sm p-2 rounded-lg border h-36 overflow-hidden overflow-y-scroll top-16">
          {options.map((state, i) => {
            return (
              <div
                key={i}
                className={`p-1 px-2 hover:bg-gray-50 cursor-pointer hover:text-black rounded  ${
                  value.value === state.value
                    ? "bg-gray-100 text-black"
                    : " text-gray-400"
                }`}
                onClick={() => {
                  handleSelect(state);
                }}
              >
                {state.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
