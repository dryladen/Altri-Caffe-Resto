"use client";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ImageUpload = ({ uid }: { uid: string }) => {
  const supabase = createClient();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;
      // upload to altri bucket
      const { error: uploadError } = await supabase.storage
        .from("altri")
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }
      // upload to product_images
      const { error: insertError } = await supabase.from("product_images").insert([
        {
          product_id: uid,
          image: filePath,
        },
      ]);
      if (insertError) {
        throw insertError;
      }

      toast({ title: "Berhasil upload gambar" });
      router.refresh();
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <label
        htmlFor="single"
        className="cursor-pointer flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
      >
        <Upload className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Upload</span>
      </label>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </div>
  );
};

export default ImageUpload;
