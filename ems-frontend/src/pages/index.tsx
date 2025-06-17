import { toast } from "react-toastify";
import EmpTable from "./EmpTable";
import type { Employee } from "../assets/empType";
import { useEffect, useMemo, useState } from "react";
import type { FormData } from "./Form";
import {
  addEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from "../services/Emplyoee.services";
import Form from "./Form";
import Drawer from "../assets/Drawer";
import Input from "../assets/Components/Input";
import { filterEmployees } from "../utils/empSearchUtils";
import Pagination from "../assets/Pagination";

const Emp = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setIsLoading(true);
    listEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        toast.error(err.res?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const filteredEmployees = useMemo(() => {
    return filterEmployees(employees, search);
  }, [employees, search]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateEmployee = (employee: Employee) => {
    setEditEmployee(employee);
    setIsDrawerOpen(true);
  };

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    const operation = editEmployee
      ? updateEmployee(editEmployee.id, data)
      : addEmployee(data);

    operation
      .then(() => {
        toast.success("সফলভাবে সম্পন্ন হয়েছে");
        fetchEmployees();
        setIsDrawerOpen(false);
        setEditEmployee(null);
        setCurrentPage(1);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteEmployee = (id: number) => {
    setIsLoading(true);
    deleteEmployee(id)
      .then((res) => {
        toast.success(res.data?.message);
        fetchEmployees();
        // If the last item on the page was deleted, go back a page
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-lg">কর্মচারীদের তালিকা</h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "প্রসেসিং..." : "+ যুক্ত করুন"}
        </button>
      </div>

      <div className="card mb-1">
        <Input
          type="search"
          placeholder={"অনুসন্ধান করুন..."}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          disabled={isLoading}
        />
      </div>

      <div className="card">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <EmpTable
              employees={currentItems}
              updateEmployee={handleUpdateEmployee}
              deleteEmployee={handleDeleteEmployee}
              isLoading={isLoading}
            />
            {filteredEmployees.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setEditEmployee(null);
          }}
        >
          <div className="p-4">
            <h2 className="text-base font-semibold mb-4 border-b border-gray-300 pb-2">
              {editEmployee ? "তথ্য হালনাগাদ করুন" : "নতুন কর্মচারী যোগ করুন"}
            </h2>
            <Form onSubmit={onSubmit} editEmployee={editEmployee} />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Emp;
