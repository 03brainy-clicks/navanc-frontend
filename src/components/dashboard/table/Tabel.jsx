import { useState } from "react";
import Row from "./Row";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authAtom from "../../../recoil/atoms/authAtom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/utils/Loader";

const QueryFn = async (token, role, user_id, setLeads) => {
  const response = await axios.get(
    `https://navanc-backend.onrender.com/leads/${role}/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  setLeads(response.data.leads);
  return response.data.leads;
};

const Table = () => {
  const { token, user_id, role } = useRecoilValue(authAtom);
  const [leads, setLeads] = useState([]);
  const { isPending } = useQuery({
    queryKey: ["leadsData", token, user_id, role, setLeads],
    queryFn: () => QueryFn(token, role, user_id, setLeads),
  });
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

 

  const filters = [
    {
      title: "All",
      value: "all",
    },
    {
      title: "Generated",
      value: "generated",
    },
    {
      title: "Acknowledged",
      value: "acknowledged",
    },
  ];

  const handleFilter = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handleUpdateStatus = (lead_number) => {
    setLeads((prevLeads) => {
      return prevLeads.map((lead) => {
        if (lead.lead_number === lead_number) {
          return {
            ...lead,
            status: "acknowledged",
          };
        }
        return lead;
      });
    });
  };

  const filteredRows = leads.filter((lead) => {
    if (filter === "all") return true;
    return lead?.status === filter;
  });

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);

  if (isPending) return <Loader/>;

  return (
    <div className="bg-white rounded-xl mt-8">
      {/* Filter */}
      <div className="filters">
        <div className="flex items-center border-b px-10 text-navanc-textTertiary">
          {filters.map((value) => (
            <div
              className={`p-4 sm:p-6 border-b-4 cursor-pointer ${
                filter === value.value
                  ? "border-navanc-primary nunito text-[#363551] font-bold"
                  : "border-transparent"
              }`}
              onClick={() => handleFilter(value.value)}
              key={value.value}
            >
              {value.title}
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="p-8 flex-1">
        <div className="rounded-lg flex flex-col border w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px] overflow-x-auto">
              <thead className="border-b">
                <tr className="uppercase text-navanc-textTertiary font-normal text-sm border-b">
                  <td className="py-5 px-2">Lead Name</td>
                  <td className="py-5 px-2">Residential Details</td>
                  <td className="py-5 px-2">Contact Number</td>
                  <td className="py-5 px-2">Status</td>
                  <td className="py-5 px-2">Actions</td>
                </tr>
              </thead>
              <tbody>
                {filteredRows.slice(startIndex, endIndex).map((row, index) => (
                  <Row
                    key={`${row.applicant_name}-${index}`}
                    name={
                      row.applicant_firstname + " " + row.applicant_lastname
                    }
                    residence={
                      row.applicant_address1 +
                      ", " +
                      row.applicant_address2 +
                      ", " +
                      row.district +
                      ", " +
                      row.district
                    }
                    contact={row.applicant_number}
                    status={row.status}
                    lead_number={row.lead_number}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="px-4 sm:px-7 py-3 flex items-center justify-between">
            <div className="space-x-3">
              <button
                className="py-2 font-medium px-3 sm:px-5 rounded-lg shadow-md border"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="py-2 font-medium px-3 sm:px-5 rounded-lg shadow-md border"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <span className="font-normal">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
