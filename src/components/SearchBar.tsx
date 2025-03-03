"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import queryString from "query-string";

export default function SearchBar() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.search) return router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          search: data.search,
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  // async function onSubmit(data: FieldValues) {
  //   if (!data.search) return router.push("/");

  //   const url = queryString.stringifyUrl(
  //     {
  //       url: "/",
  //       query: {
  //         search: data.search,
  //       },
  //     },
  //     { skipNull: true }
  //   );

  //   router.push(url);
  //   reset();
  // }

  return (
    <div className="flex items-center">
      <input
        {...register("search")}
        type="text"
        placeholder="Explore Cartsphere..."
        autoComplete="off"
        className="p-2 border border-gray-300 rounded-l-md focus:border-[0.5px] focus:border-slate-500 w-80 placeholder:text-sm"
      />
      <button
        className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md"
        onClick={handleSubmit(onSubmit)}
      >
        Search
      </button>
    </div>
  );
}
