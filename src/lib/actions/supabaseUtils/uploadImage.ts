import supabase from "./supabase";

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from("products")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false, // Set to true if you want to overwrite existing files
    });

  if (error) throw error;

  return data;
};
