
import React from "react";

const NormalInputField = ({
  type = "text",
  value,
  setValue,
  placeholder,
}) => {
  return (
    <div>
      <input
        type={type}
        className="py-2 px-3 w-full rounded-lg border outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default NormalInputField;
