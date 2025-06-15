package curd.oparation.ems_backend.service.implementation;

import curd.oparation.ems_backend.dto.EmployeeDto;
import curd.oparation.ems_backend.entity.Employee;
import curd.oparation.ems_backend.exception.ResourneNotFound;
import curd.oparation.ems_backend.mapper.EmployeeMapper;
import curd.oparation.ems_backend.repository.EmployeeRepo;
import curd.oparation.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepo employeeRepo;

    //Crete an employee
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.maptoEmployee(employeeDto);
        Employee savedEmployee = employeeRepo.save(employee);
        return EmployeeMapper.maptoEmployeeDto(savedEmployee);
    }

    //Get Employee by I'd
    @Override
    public EmployeeDto getEmployee(long employeeId) {
      Employee employee = employeeRepo.findById(employeeId).orElseThrow(() -> new ResourneNotFound("Employee is not exits with the given id :"+ employeeId));
        return EmployeeMapper.maptoEmployeeDto(employee);
    }

    //Get All Employee
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepo.findAll();
        return employees.stream().map(EmployeeMapper::maptoEmployeeDto).toList();
    }
    //Update Employee

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new ResourneNotFound("Employee is not exits with the given id :" + employeeId));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updateEmployeeObj = employeeRepo.save(employee);
        return EmployeeMapper.maptoEmployeeDto(updateEmployeeObj);
    }
//Remove Employee
    @Override
    public void deleteEmployee(long employeeId) {
        Employee employee = employeeRepo.findById(employeeId).orElseThrow(() -> new ResourneNotFound("Employee is not exits with the given id :"+ employeeId));

        employeeRepo.deleteById(employeeId);
    }
}

