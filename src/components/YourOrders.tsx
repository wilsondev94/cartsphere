"use client";

import { formatPrice } from "@/lib/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Order, User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "./ActionBtn";
import Heading from "./reusables/Heading";
import Status from "./Status";

type ExtendOrder = Order & {
  user: User;
};

interface YourOrdersProps {
  orders: ExtendOrder[];
}

export default function YourOrders({ orders }: YourOrdersProps) {
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: order.amount,
        status: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer", width: 220 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {formatPrice(params.row.amount / 100)}
          </div>
        );
      },
    },

    {
      field: "status",
      headerName: "Payment status",
      width: 130,
      renderCell: (params) => {
        const status = params.row.status;
        return (
          <div>
            {status === "pending" && (
              <Status
                text="Pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            )}
            {status === "complete" && (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            )}
          </div>
        );
      },
    },

    {
      field: "deliveryStatus",
      headerName: "Delivery status",
      width: 130,
      renderCell: (params) => {
        const deliveryStatus = params.row.deliveryStatus;
        return (
          <div>
            {deliveryStatus === "pending" && (
              <Status
                text="Pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            )}
            {deliveryStatus === "dispatched" && (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            )}
            {deliveryStatus === "delivered" && (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            )}
          </div>
        );
      },
    },

    { field: "date", headerName: "Date", width: 130 },

    {
      field: "action",
      headerName: "Actions",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => router.push(`/order/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Your Orders" center />
      </div>
      <div
        style={{
          height: 600,
          width: "100%",
          border: "1px solid #dbdde0",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
