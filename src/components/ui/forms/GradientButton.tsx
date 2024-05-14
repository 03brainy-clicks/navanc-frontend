import React from "react";
import Loader from "../utils/Loader";

const GradientButton = ({
  title,
  handleClick,
  disable = false,
  loading = false,
  classes,
}) => {
  return (
    <button
      className={`py-2 px-5 text-white bg-gradient-to-b from-navanc-primary to-navanc-secondary rounded-lg text-center font-medium  flex items-center justify-center gap-2 ${classes}`}
      onClick={handleClick}
      disabled={disable}
    >
      <div>{loading && <Loader />}</div> {title}
      <div></div>
    </button>
  );
};

export default GradientButton;
