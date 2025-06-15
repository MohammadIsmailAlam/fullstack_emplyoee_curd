package curd.oparation.ems_backend.service;

import curd.oparation.ems_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployee(long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeID, EmployeeDto updatedEmployee);
    void deleteEmployee(long employeeId);
}
