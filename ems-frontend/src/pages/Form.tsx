import { useForm } from "react-hook-form";
import Input from "../assets/Components/Input";
import { FaRegSave } from "react-icons/fa";
import type { Employee } from "../assets/empType";
import { useEffect } from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
  editEmployee?: Employee | null;
}

const Form = ({ onSubmit, editEmployee }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: editEmployee || {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  useEffect(() => {
    reset(
      editEmployee || {
        firstName: "",
        lastName: "",
        email: "",
      }
    );
  }, [editEmployee, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="text"
        label="নামের প্রথমাংশ"
        placeholder="নাম (ইংরেজি) লিখুন"
        registerProperty={{
          ...register("firstName", {
            required: "নাম (ইংরেজি) লিখুন",
          }),
        }}
        isRequired
        isError={!!errors?.firstName}
        errorMessage={errors?.firstName?.message}
      />

      <Input
        type="text"
        label="নামের শেষাংশ"
        placeholder="নাম (ইংরেজি) লিখুন"
        registerProperty={{
          ...register("lastName", {
            required: "নাম (ইংরেজি) লিখুন",
          }),
        }}
        isRequired
        isError={!!errors?.lastName}
        errorMessage={errors?.lastName?.message}
      />

      <Input
        type="email"
        label="ইমেইল"
        placeholder="ইমেইল অ্যাড্রেস লিখুন"
        registerProperty={{
          ...register("email", {
            required: "ইমেইল অ্যাড্রেস লিখুন",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "অবশ্যই একটি বৈধ ইমেইল অ্যাড্রেস লিখুন",
            },
          }),
        }}
        isRequired
        isError={!!errors?.email}
        errorMessage={errors?.email?.message}
      />
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm  rounded p-1.5 shadow transition-all duration-200"
        >
          দাখিল করুন
          <FaRegSave className="text-sm" />
        </button>
      </div>
    </form>
  );
};

export default Form;
