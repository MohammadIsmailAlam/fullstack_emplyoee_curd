import axios from "axios";
import type { Employee } from "../assets/empType";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";
//gets all employees from the server
export const listEmployees = () => axios.get<Employee[]>(REST_API_BASE_URL);

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
