package curd.oparation.ems_backend.repository;

import curd.oparation.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long> { }

