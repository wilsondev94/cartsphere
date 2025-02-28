import supabase from "./supabase";

export const getImageUrl = (path: string) => {
  return supabase.storage.from("products").getPublicUrl(path).data.publicUrl;
};
