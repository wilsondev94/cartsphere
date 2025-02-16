"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function FormFields({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: FormFieldProps) {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        placeholder=""
        type={type}
        {...register(id, { required })}
        className={`
        w-full bg-slate-100 peer p-4 pt-6 outline-none border-y-white border-2 font-light rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-400" : "border-slate-300"} 
        ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"} 
        `}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-rose-400" : "text-slate-400"
        } `}
      >
        {label}
      </label>
    </div>
  );
}
