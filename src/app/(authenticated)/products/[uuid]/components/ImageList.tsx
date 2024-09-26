import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ImageList = () => {
  
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Gambar</CardTitle>
        <CardDescription>Silahkan tambahkan gambar produk</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={"/next.svg"}
            width="300"
            priority
          />
          <div className="grid grid-cols-3 gap-2">
            {/* {gambar?.map((item) => (
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
            ))} */}
            {/* {gambar && gambar?.length < 3 && (
              <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </button>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageList;
