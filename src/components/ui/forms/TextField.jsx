import React from "react";

const TextField = ({ label, value, setValue, required = false, optional }) => {
  return (
    <fieldset className="rounded-lg border text-navanc-textTertiary">
      <legend className="ml-3 px-1 text-sm">
        {label} {required && <span className="text-black">*</span>}
      </legend>
      <div className="flex items-center gap-2">
        <input
          required={required}
          type="text"
          className="border-none outline-none py-1 px-3 rounded-lg w-full mb-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {optional && (
          <span className="text-xs text-gray-300 pr-2 mb-1">Optional</span>
        )}
      </div>
    </fieldset>
  );
};

export default TextField;
