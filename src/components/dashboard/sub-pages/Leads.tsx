import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import React from "react";
import Table from "../table/Tabel";

const Leads = () => {
  return (
    <div className="bg-[#f3f5fb] w-full min-h-full overflow-hidden overflow-y-scroll p-5  md:py-16 md:px-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads Tracker</h1>
        <Link to={"/createlead"}>
          <button className="py-3 px-5 flex items-center gap-2 bg-navanc-deepPurple text-white rounded-full font-medium cursor-pointer">
            <DocumentPlusIcon className="w-5" />
            <span>Create Lead</span>
          </button>
        </Link>
      </div>
      <Table />
    </div>
  );
};

export default Leads;
