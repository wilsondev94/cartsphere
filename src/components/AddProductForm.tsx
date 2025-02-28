"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { getImageUrl } from "@/lib/actions/supabaseUtils/getImageUrl";
import { uploadImage } from "@/lib/actions/supabaseUtils/uploadImage";
import { categories, colors } from "@/lib/utils";
import { ImageType, UploadedImageType } from "@/types";
import { useRouter } from "next/navigation";
import Button from "./reusables/Button";
import CategoryInput from "./reusables/CategoryInput";
import Checkbox from "./reusables/Checkbox";
import FormFields from "./reusables/FormFields";
import Heading from "./reusables/Heading";
import SelectColor from "./reusables/SelectColor";
import TextArea from "./reusables/TextArea";

export default function AddProductForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  async function onSubmit(data: FieldValues) {
    setIsLoading(true);

    const uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Please select a category!");
    }

    if (!data.images || data.images === 0) {
      setIsLoading(false);
      return toast.error("Please upload an image!");
    }

    const handleImageUpload = async () => {
      toast("Creating product, please wait...");

      try {
        for (const item of data.images) {
          const uploadedFile = await uploadImage(item.image);

          const imageUrl = getImageUrl(uploadedFile.path);

          uploadedImages.push({
            ...item,
            image: imageUrl,
          });

          // if (item.image) {
          //   const fileName = `${new Date().getTime()}-${item.image.name}`;
          //   const storage = getStorage(firebaseApp);
          //   const storageRef = ref(storage, `product/${fileName}`);
          //   const uploadTask = uploadBytesResumable(storageRef, item.image);
          //   await new Promise<void>((resolve, reject) => {
          //     uploadTask.on(
          //       "state_changed",
          //       (snapshot) => {
          //         const progress =
          //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //         console.log(`Upload is ${progress}% done`);
          //         switch (snapshot.state) {
          //           case "paused":
          //             toast("Upload is paused");
          //             console.log("Upload is paused");
          //             break;
          //           case "running":
          //             toast("Upload is running");
          //             console.log("Upload is running");
          //             break;
          //         }
          //       },
          //       (error) => {
          //         console.log("Error uploading image", error);
          //         reject(error);
          //       },
          //       () => {
          //         getDownloadURL(uploadTask.snapshot.ref)
          //           .then((downloadUrl) => {
          //             console.log("File available at", downloadUrl);
          //             uploadedImages.push({
          //               ...item,
          //               image: downloadUrl,
          //             });
          //             resolve();
          //           })
          //           .catch((error) => {
          //             console.log("Error getting download Url", error);
          //             reject(error);
          //           });
          //       }
          //     );
          //   });
          // }
        }
      } catch (error) {
        setIsLoading(false);

        console.log("Error handling image uploads", error);

        return toast.error("Error handling image uploads");
      }
    };

    await handleImageUpload();

    const productData = { ...data, images: uploadedImages };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Smething went wrong while creating product");
      })
      .finally(() => setIsLoading(false));
  }

  const setCustomFormValue = (
    id: string,
    value: string | ImageType[] | null
  ) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const category = watch("category");

  useEffect(() => {
    setCustomFormValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const addImageToFormstate = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromFormstate = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImage = prev?.filter(
          (image) => image.color !== value.color
        );

        return filteredImage;
      }

      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Add a Product" center />
      <FormFields
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <FormFields
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <FormFields
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Checkbox
        id="inStock"
        label="In stock"
        disabled={isLoading}
        register={register}
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label}>
                <CategoryInput
                  label={item.label}
                  icon={item.icon}
                  onClick={(label) => setCustomFormValue("category", label)}
                  selected={category === item.label}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select available product and upload their images
          </div>
          <div className="text-sm">
            You must upload an image for the each of the color you selected
            otherwise your color will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((color) => {
            return (
              <SelectColor
                key={color.colorCode}
                item={color}
                addImageToFormState={addImageToFormstate}
                removeImageFromFormState={removeImageFromFormstate}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>

      <Button
        label={isLoading ? "Loading..." : "Add product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
}
