import type { Employee } from "../assets/empType";

interface EmpTableProps {
  employees: Employee[];
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
}

const EmpTable = ({
  employees,
  updateEmployee,
  deleteEmployee,
}: EmpTableProps) => {
  return (
    <div className="p-4 m-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="border border-gray-300 p-2">{emp.id}</td>
              <td className="border border-gray-300 p-2">{emp.firstName}</td>
              <td className="border border-gray-300 p-2">{emp.lastName}</td>
              <td className="border border-gray-300 p-2">{emp.email}</td>
              <td className="border border-gray-300 p-2 flex justify-center gap-2">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => updateEmployee(emp)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpTable;
