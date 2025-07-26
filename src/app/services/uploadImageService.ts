import supabase from "../../../utils/supabase/supaBaseClient";


export const uploadImageService = async (file: File, folder: string): Promise<string | null> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("study-abroad-africa")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("study-abroad-africa").getPublicUrl(filePath);

  return publicUrl;
};
