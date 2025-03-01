"use client";

import { formatPrice } from "@/lib/utils";
import { Order } from "@prisma/client";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import Heading from "./reusables/Heading";
import Status from "./Status";
import moment from "moment";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order details" />
      </div>
      <div>Order ID:{order.id}</div>
      <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div>

      <div className="flex gap-2 items-center ">
        <div>Payment status:</div>
        <div>
          {order.status === "pending" && (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          )}
          {order.status === "complete" && (
            <Status
              text="Completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          )}
        </div>

        <div>Delivery status:</div>
        <div>
          {order.deliveryStatus === "pending" && (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          )}
          {order.deliveryStatus === "dispatched" && (
            <Status
              text="Dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          )}
          {order.deliveryStatus === "delivered" && (
            <Status
              text="Delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          )}
        </div>
      </div>
      <div>Date: {moment(order.createdDate).fromNow()}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>

        {order.products.map((orderItem) => {
          return <OrderItem key={order.id} orderItem={orderItem} />;
        })}
      </div>
    </div>
  );
}
