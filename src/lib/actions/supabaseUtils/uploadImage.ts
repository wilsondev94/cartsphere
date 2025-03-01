import supabase from "./supabase";

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from("products")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  return data;
};

export async function deleteImage(publicUrl: string) {
  try {
    /* Extract bucket and file path from the public URL
    
    const url = new URL(publicUrl);
    const path = url.pathname.split("/storage/v1/object/public/")[1];
    
    if (!path) throw new Error("Invalid Supabase public URL");
    
    const [bucket, ...filePathParts] = path.split("/");
    const filePath = filePathParts.join("/");
    
    Delete the file from Supabase */

    // ALTERNATIVELY
    const path = publicUrl.split("/").slice(-2).join("/");

    const { error } = await supabase.storage.from("products").remove([path]);

    if (error) {
      console.error("Error deleting image:", error.message);
      return false;
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: err };
  }
}
