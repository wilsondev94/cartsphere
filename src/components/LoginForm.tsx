"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormFields from "./reusables/FormFields";
import Heading from "./reusables/Heading";
import Button from "./reusables/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    setIsLoading(true);
    console.log(value);
    setIsLoading(false);
  };

  return (
    <>
      <Heading title="Login" />
      <Button
        label="Continue with Google"
        outline
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <FormFields
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <FormFields
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <p>
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline text-blue-400">
          Register
        </Link>
      </p>
    </>
  );
}
