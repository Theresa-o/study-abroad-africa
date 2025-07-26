import { uploadImageService } from "@/app/services/uploadImageService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useImageCoursesUpload = (folder: string) => {
  return useMutation({
    mutationFn: (file: File) => uploadImageService(file, folder),
    onError: (error: string) => {
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
};