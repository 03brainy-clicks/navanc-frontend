import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRef, useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-8 pb-10 rounded-lg shadow-lg">
        <div className="flex items-center justify-end">
          <XMarkIcon
            className="w-5 h-5 text-gray-600 hover:text-red-500 animate cursor-pointer"
            onClick={() => onClose(false)}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
