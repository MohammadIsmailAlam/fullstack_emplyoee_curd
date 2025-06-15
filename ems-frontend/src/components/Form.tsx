import { useForm } from "react-hook-form";
import Input from "../assets/Components";

export interface FormData {
  firstName: string; // Changed from nameFirst to firstName
  lastName: string; // Changed from nameLast to lastName
  email: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="text"
        label="নামের প্রথমাংশ"
        placeholder="নাম (ইংরেজি) লিখুন"
        registerProperty={{
          ...register("firstName", {
            // Changed from nameFirst to firstName
            required: "নাম (ইংরেজি) লিখুন",
          }),
        }}
        isRequired
        isError={!!errors?.firstName} // Changed from nameFirst to firstName
        errorMessage={errors?.firstName?.message} // Changed from nameFirst to firstName
      />

      <Input
        type="text"
        label="নামের শেষাংশ"
        placeholder="নাম (ইংরেজি) লিখুন"
        registerProperty={{
          ...register("lastName", {
            // Changed from nameLast to lastName
            required: "নাম (ইংরেজি) লিখুন",
          }),
        }}
        isRequired
        isError={!!errors?.lastName} // Changed from nameLast to lastName
        errorMessage={errors?.lastName?.message} // Changed from nameLast to lastName
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

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
