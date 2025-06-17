import type { Employee } from "../assets/empType";
import { useState, useRef, useEffect } from "react";
import { numEnToBn, toggleDropdown } from "../utils/empSearchUtils";

interface EmpTableProps {
  employees: Employee[];
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
  isLoading: boolean;
}

const EmpTable = ({
  employees,
  updateEmployee,
  deleteEmployee,
  isLoading,
}: EmpTableProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // Create a ref to hold references to each dropdown element by employee id
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId !== null) {
        const dropdownElement = dropdownRefs.current[openDropdownId];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);
  if (employees.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        কোনো কর্মচারী পাওয়া যায়নি
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div>তথ্য লোড হচ্ছে...</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2 text-left">আইডি নম্বর</th>
              <th className="p-2 text-left">নামের প্রথম অংশ</th>
              <th className="p-2 text-left">নামের শেষাংশ</th>
              <th className="p-2 text-left">ইমেইল</th>
              <th className="p-2 text-end">কার্যক্রম</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-gray-300">
                <td className="p-2">{numEnToBn(emp.id)}</td>
                <td className="p-2">{emp.firstName}</td>
                <td className="p-2">{emp.lastName}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">
                  <div className="relative flex justify-end">
                    <div
                      className="dropdown"
                      ref={(el) => {
                        dropdownRefs.current[emp.id] = el;
                      }}
                    >
                      <button
                        type="button"
                        className="p-1 rounded inline-flex items-center text-lg"
                        onClick={() =>
                          toggleDropdown(
                            openDropdownId,
                            emp.id,
                            setOpenDropdownId
                          )
                        }
                      >
                        :
                      </button>
                      <div
                        className={`dropdown-menu absolute right-0 bg-white shadow-lg rounded z-10 ${
                          openDropdownId === emp.id ? "block" : "hidden"
                        }`}
                      >
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100"
                          onClick={() => {
                            updateEmployee(emp);
                          }}
                          disabled={isLoading}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100"
                          onClick={() => {
                            deleteEmployee(emp.id);
                            setOpenDropdownId(null);
                          }}
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EmpTable;
