"use client"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  item? : any;
};

const ImageItem = ({ item } : Props) => {
  const [isHover, setIsHover] = useState(false);
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
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageItem;
