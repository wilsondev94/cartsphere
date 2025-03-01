"use client";

import { formatPrice } from "@/lib/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { deleteImage } from "@/lib/actions/supabaseUtils/uploadImage";
import { Product } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "./ActionBtn";
import Heading from "./reusables/Heading";
import Status from "./Status";

interface ManageProductProps {
  products: Product[];
}

export default function ManageProducts({ products }: ManageProductProps) {
  const router = useRouter();

  let rows: Product[] = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {formatPrice(params.row.price)}
          </div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "In stock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock ? (
              <Status
                text="Yes"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="No"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => handleDelete(params.row.id, params.row.images)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => router.push(`product/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then(() => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  }, []);

  // const storage = getStorage(firebaseApp);
  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleting product, please wait.");

    const handleDeleteImage = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            // const imageRef = ref(storage, item.image);
            // await deleteObject(imageRef);

            const response = await deleteImage(item.image);

            if (response && response.success) {
              console.log("Image deleted successfully!");
            } else {
              if (response && "error" in response) {
                console.log("Failed to delete image:", response.error);
              }
            }
          }
        }
      } catch (error) {
        console.log("Error deleting image", error);
      }
    };

    await handleDeleteImage();

    axios
      .delete(`/api/product/${id}`)
      .then(() => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
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
