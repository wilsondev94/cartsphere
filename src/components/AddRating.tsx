"use client";

import { useState } from "react";
import { SafeUser } from "@/types";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "./reusables/Heading";
import { Rating } from "@mui/material";
import FormFields from "./reusables/FormFields";
import Button from "./reusables/Button";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };

  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

export default function AddRating({ product, user }: AddRatingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  if (!user || !product) return null;

  const setCustomFormValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  async function onSubmit(data: FieldValues) {
    setIsLoading(true);

    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("Please rate this product.");
    }

    const ratingData = { ...data, userId: user?.id, product: product };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Product rated.");
        router.refresh();
        reset();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  }

  const deliveredOrder = user?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product?.reviews.find(
    (review: Review) => review.userId === user.id
  );

  if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(e, newValue) => {
          setCustomFormValue("rating", newValue);
        }}
      />
      <FormFields
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
}
