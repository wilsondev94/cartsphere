"use client";

import moment from "moment";
import Heading from "./reusables/Heading";
import { Rating } from "@mui/material";
import Avatar from "./Avatar";

interface RatingListProps {
  product: any;
}

export default function RatingList({ product }: RatingListProps) {
  if (product.reviews.length === 0) return null;

  return (
    <div>
      <Heading title="Product review" />
      <div className="text-sm mt-2">
        {product?.reviews &&
          product?.reviews.map((review: any) => {
            const name = review.user.name.split(" ").slice();

            const firstName = name[0];
            const lastName = name[name.length - 1];

            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex items-center gap-2">
                  <Avatar src={review.user.image} />

                  <div className="font-semibold ">
                    {firstName} {lastName}
                  </div>
                  <div>{moment(review.createdDate).fromNow()}</div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2">{review.comment}</div>
                  <hr className="my-2" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
