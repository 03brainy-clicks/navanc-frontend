import React from "react";

const NumberField = ({ label, value, setValue, required = false }) => {
  return (
    <fieldset className="rounded-lg border text-navanc-textTertiary py-1 pb-2">
      <legend className=" ml-3 px-1 text-sm">
        {" "}
        {label} {required && <span className="text-black">*</span>}
      </legend>

      <div className="flex gap-2 items-center mb-1">
        <div className="px-3 border-r border-gray-400 text-gray-400 leading-5">
          +91{" "}
        </div>

        <input
          required={required}
          type="text"
          className="border-none outline-none px-2 rounded-lg w-full "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </fieldset>
  );
};

export default NumberField;
