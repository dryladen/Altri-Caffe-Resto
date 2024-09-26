"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  item?: any;
};

const ImageItem = ({ item }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const deleteImage = async () => {
    try {
      setIsDeleting(true);
      const { data, error } = await supabase
        .from("product_images")
        .delete()
        .eq("id", item.id);
      if (error) {
        throw error;
      }
      const { data: deletedImage, error: deleteError } = await supabase.storage
        .from("altri")
        .remove([item.image]);
      if (deleteError) {
        throw deleteError;
      }
      console.log(data);
      // setIsDeleting(false);
      toast({ title: "Berhasil menghapus gambar" });
      router.refresh();
    } catch (error) {
      console.log("Error deleting image: ", error);
    }
  };
  return (
    <div
      key={item.id}
      className="relative group"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        alt="Product image"
        className="aspect-square w-full rounded-md object-cover"
        height="300"
        src={
          "https://zezcwsgmgesmhbaaghqf.supabase.co/storage/v1/object/public/altri/" +
          item.image
        }
        width="300"
      />
      {isHover && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg transition-opacity duration-300 ease-in-out">
          <Button
            variant="destructive"
            size="icon"
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            aria-label="Delete image"
            onClick={deleteImage}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <LoaderCircle className="h-4 w-4 text-white animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageItem;
