package curd.oparation.ems_backend.mapper;

import curd.oparation.ems_backend.dto.EmployeeDto;
import curd.oparation.ems_backend.entity.Employee;

public class EmployeeMapper {
    public static Employee maptoEmployee(EmployeeDto dto) {
        Employee employee = new Employee();
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        return employee;
    }

    public static EmployeeDto maptoEmployeeDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());
        return dto;
    }
}

