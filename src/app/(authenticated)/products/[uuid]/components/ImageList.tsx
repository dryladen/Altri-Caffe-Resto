import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import ImageItem from "./ImageItem";
import { Upload } from "lucide-react";
import ImageUpload from "./ImageUpload";
type Props = {
  uuid: string;
};
const ImageList = async ({ uuid }: Props) => {
  const supabase = createClient();
  const { data: gambar } = await supabase
    .from("product_images")
    .select()
    .eq("product_id", uuid);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Gambar</CardTitle>
        <CardDescription>Silahkan tambahkan gambar produk</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {gambar && gambar.length > 0 && <ImageItem item={gambar[0]} />}
          <div className="grid grid-cols-3 gap-2">
            {gambar?.slice(1).map((item) => (
              <ImageItem key={item.id} item={item} />
            ))}
            <ImageUpload uid={uuid} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageList;
