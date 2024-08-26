import Menu from "@/components/Menu";
import { db } from "@/db";

export default async function Home() {
  const categories = await db.query.categoriesTable.findMany({
    with: {
      products: true,
    },
  });
  return <Menu categories={categories} />;
}
