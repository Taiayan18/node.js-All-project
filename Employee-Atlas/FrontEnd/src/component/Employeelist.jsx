import { useEffect, useState } from "react";
import { getEmployee } from "../api/api";
import { Link } from "react-router-dom";

export const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [params, setParams] = useState({
    search: "",
    sortBy: "",
    order: "asc",
    page: 1,
    limit: 5,
  });

  const fetchEmployee = async () => {
    try {
      const res = await getEmployee(params);
      setEmployee(res.data);
    
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Employee List
        </h2>

        {/* 🔍 Controls (CENTERED) */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-full md:w-80 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            onChange={(e) =>
              setParams({ ...params, search: e.target.value, page: 1 })
            }
          />

          <select
            className="w-full md:w-40 p-3 rounded-xl border border-gray-300 shadow-sm"
            onChange={(e) =>
              setParams({ ...params, sortBy: e.target.value })
            }
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="salary">Salary</option>
          </select>

          <select
            className="w-full md:w-40 p-3 rounded-xl border border-gray-300 shadow-sm"
            onChange={(e) =>
              setParams({ ...params, order: e.target.value })
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

        </div>

        <Link to="/login"><button className="border  border-black" >Login User</button></Link>


        {/* 📦 Employee Cards */}
        {employee.length === 0 ? (
          <p className="text-center text-gray-500">No employees found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employee.map((emp) => (
              <div
                key={emp._id}
                className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {emp.name}
                </h3>
                <p className="text-gray-600">{emp.email}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Dept: {emp.department}
                </p>
                <p className="mt-1 font-medium text-blue-600">
                  ₹ {emp.salary}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 📄 Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={params.page === 1}
            onClick={() =>
              setParams({ ...params, page: params.page - 1 })
            }
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
          >
            Prev
          </button>

          <span className="font-medium text-gray-700">
            Page {params.page} / {totalPages}
          </span>

          <button
            disabled={params.page === totalPages}
            onClick={() =>
              setParams({ ...params, page: params.page + 1 })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};