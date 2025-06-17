import React from "react";

export type ISizes = "sm" | "md" | "lg";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: ISizes;
  variant?: "solid" | "outline";
  label?: string;
  numericOnly?: boolean;
  isRequired?: boolean;
  hasInfo?: boolean;
  infoText?: string;
  isError?: boolean;
  helpText?: string;
  isValid?: boolean;
  errorMessage?: string;
  noMargin?: boolean;
  registerProperty?: Record<string, unknown>;
  startIcon?: React.ReactNode;
  startIconClassName?: string;
  endIcon?: React.ReactNode;
  isMultiple?: boolean;
  viewOnly?: string | number;
  isPhone?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      inputSize = "md",
      variant = "outline",
      label,
      type = "text",
      placeholder,
      isRequired,
      isError,
      errorMessage,
      registerProperty = {},
      className = "",
      noMargin,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-3 text-base",
      lg: "py-3 px-4 text-lg",
    };

    const variantClasses = {
      outline: "border border-gray-300 focus:border-blue-500",
      solid: "bg-gray-100 focus:bg-white",
    };

    return (
      <div className={`${noMargin ? "" : "mb-4"}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`${sizeClasses[inputSize]} ${variantClasses[variant]} ${
              isError ? "border-red-500" : ""
            } block w-full rounded-md shadow-sm focus:ring-blue-500 focus:outline-none ${className}`}
            {...registerProperty}
            {...props}
          />
        </div>
        {isError && errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
