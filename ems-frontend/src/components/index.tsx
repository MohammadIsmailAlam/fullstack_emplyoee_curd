import { toast } from "react-toastify";
import EmpTable from "./EmpTable";
import type { Employee } from "../assets/empType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "./Form";
import {
  addEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from "../services/Emplyoee.services";
import Form from "./Form";

const Emp = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    listEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => toast.error(err?.message));
  };

  const onSubmit = (data: FormData) => {
    addEmployee(data)
      .then(() => {
        toast.success("Employee added successfully");
        fetchEmployees();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to add employee");
      });
  };

  const handleUpdateEmployee = (employee: Employee) => {
    updateEmployee(employee.id, employee)
      .then(() => {
        toast.success("Employee updated successfully");
        fetchEmployees();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to update employee");
      });
  };

  const handleDeleteEmployee = (id: number) => {
    deleteEmployee(id)
      .then(() => {
        toast.success("Employee deleted successfully");
        fetchEmployees();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to delete employee");
      });
  };

  return (
    <div className="p-4 m-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-lg">কর্মচারীদের তালিকা</h1>
        <button
          onClick={() => navigate("/add-employee")}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          + যুক্ত করুন
        </button>
      </div>

      <EmpTable
        employees={employees}
        updateEmployee={handleUpdateEmployee}
        deleteEmployee={handleDeleteEmployee}
      />
      <Form onSubmit={onSubmit} />
    </div>
  );
};

export default Emp;
