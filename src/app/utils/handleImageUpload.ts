import { toast } from "sonner";

  
  type UploadOptions = {
    uploadImage: (
      file: File,
      options: { onSuccess: (url: string | null) => void; onError: () => void }
    ) => void;
    setFieldValue: (field: string, value: unknown) => void;
    fieldName: string
  };

export const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    { uploadImage, setFieldValue, fieldName }: UploadOptions
  ) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }

    uploadImage(file, {
      onSuccess: (imageUrl) => {
        if (imageUrl) {
          setFieldValue(fieldName, imageUrl);
        }
      },
      onError: () => {
        toast.error("Failed to upload image.");
      },
    });
  };