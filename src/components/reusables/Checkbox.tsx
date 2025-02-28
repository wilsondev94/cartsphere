"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

export default function Checkbox({
  id,
  label,
  disabled,
  register,
}: CheckboxProps) {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        placeholder=""
        disabled={disabled}
        {...register(id)}
        className="cursor-pointer "
      />

      <label htmlFor={id} className="text-md cursor-pointer">
        {label}
      </label>
    </div>
  );
}
