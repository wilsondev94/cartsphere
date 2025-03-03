"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "./reusables/Heading";
import { formatNumber, formatPrice } from "@/lib/utils";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

export default function Summary({ orders, products, users }: SummaryProps) {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sales",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      const sumData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else {
          return acc;
        }
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      sumData.sale.digit = totalSale;
      sumData.orders.digit = orders.length;
      sumData.products.digit = products.length;
      sumData.paidOrders.digit = paidOrders.length;
      sumData.unpaidOrders.digit = unpaidOrders.length;
      sumData.users.digit = users.length;

      return sumData;
    });
  }, []);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {/* <div>
          {summaryData.sale.label} {summaryData.sale.digit}
        </div> */}

        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {/* {summaryData[key].digit} */}
                  {summaryData[key].label === "Total Sales" ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div className="">{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
