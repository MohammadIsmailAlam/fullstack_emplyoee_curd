// src/utils/employeeUtils.ts
import { useEffect, type RefObject } from "react";
import type { Employee } from "../assets/empType";

/**
 * Filters employees based on search term
 * @param employees Array of employees to filter
 * @param searchTerm The search term to filter by
 * @returns Filtered array of employees
 */
export const filterEmployees = (
  employees: Employee[],
  searchTerm: string
): Employee[] => {
  if (!searchTerm.trim()) return employees;

  const lowerCaseSearch = searchTerm.toLowerCase();

  return employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(lowerCaseSearch) ||
      emp.lastName.toLowerCase().includes(lowerCaseSearch) ||
      emp.email.toLowerCase().includes(lowerCaseSearch) ||
      emp.id.toString().includes(searchTerm)
  );
};

/**
 * Sorts employees by a given field
 * @param employees Array of employees to sort
 * @param field Field to sort by ('firstName', 'lastName', 'email', 'id')
 * @param direction Sort direction ('asc' or 'desc')
 * @returns Sorted array of employees
 */
export const sortEmployees = (
  employees: Employee[],
  field: keyof Employee,
  direction: "asc" | "desc" = "asc"
): Employee[] => {
  return [...employees].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const useDropdownClose = <T extends HTMLElement>(
  dropdownRef: RefObject<T | null>,
  closeHandler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeHandler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, closeHandler]);
};

export const toggleDropdown = (
  currentId: number | null,
  targetId: number,
  setter: (id: number | null) => void
) => {
  setter(currentId === targetId ? null : targetId);
};
