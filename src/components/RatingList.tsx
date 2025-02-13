"use client";

import moment from "moment";
import ReusableHeading from "./ReusableHeading";
import { Rating } from "@mui/material";

interface RatingListProps {
  product: any;
}

export default function RatingList({ product }: RatingListProps) {
  return (
    <div>
      <ReusableHeading title="Product review" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => (
            <div key={review.id} className="max-w-[300px]">
              <div className="flex items-center gap-2">
                <div>Avatar</div>
                <div>{review?.user.name}</div>
                <div>{moment(review.createdDate).fromNow()}</div>
              </div>
              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className="my-2" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
