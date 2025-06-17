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

const Emp = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setIsLoading(true);
    listEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => toast.error(err?.message))
      .finally(() => setIsLoading(false));
  };

  const filteredEmployees = useMemo(() => {
    return filterEmployees(employees, search);
  }, [employees, search]);

  const handleUpdateEmployee = (employee: Employee) => {
    console.log("Updating employee:", employee);
    setEditEmployee(employee);
    setIsDrawerOpen(true);
  };

  //////////////////////////////////////////////////////////////
  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    const operation = editEmployee
      ? updateEmployee(editEmployee.id, data)
      : addEmployee(data);

    operation
      .then(() => {
        toast.success(
          editEmployee
            ? "Employee updated successfully"
            : "Employee added successfully"
        );
        fetchEmployees();
        setIsDrawerOpen(false);
        setEditEmployee(null);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            (editEmployee
              ? "Failed to update employee"
              : "Failed to add employee")
        );
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteEmployee = (id: number) => {
    setIsLoading(true);
    deleteEmployee(id)
      .then(() => {
        toast.success("Employee deleted successfully");
        fetchEmployees();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to delete employee");
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
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="card">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <EmpTable
            employees={filteredEmployees}
            updateEmployee={handleUpdateEmployee}
            deleteEmployee={handleDeleteEmployee}
            isLoading={isLoading}
          />
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
              {editEmployee ? " নতুন কর্মচারী যোগ করুন" : "তথ্য হালনাগাদ করুন"}
            </h2>
            <Form onSubmit={onSubmit} editEmployee={editEmployee} />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Emp;
