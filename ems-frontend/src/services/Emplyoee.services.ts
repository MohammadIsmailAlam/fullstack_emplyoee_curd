import axios from "axios";
import type { Employee } from "../assets/empType";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";
//gets all employees from the server
export const listEmployees = async () => {
  const response = await axios.get<Employee[]>(REST_API_BASE_URL);
  // Sort by createdAt if available, otherwise by ID (newest first)
  const sortedEmployees = response.data.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.id - a.id; // Fallback to sort by ID if no createdAt
  });
  return { data: sortedEmployees };
};

//Get All emplyoees from the server
export const getEmployees = () => axios.get<Employee[]>(REST_API_BASE_URL);

//adds a new employee to the server
export const addEmployee = (employee: Omit<Employee, "id">) => {
  return axios.post<Employee>(REST_API_BASE_URL, employee);
};

//updates an existing employee on the server
export const updateEmployee = (id: number, employee: Omit<Employee, "id">) => {
  return axios.put<Employee>(`${REST_API_BASE_URL}/${id}`, employee);
};

//deletes an employee from the server
export const deleteEmployee = (id: number) => {
  return axios.delete(`${REST_API_BASE_URL}/${id}`);
};
