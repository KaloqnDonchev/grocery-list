import { getItems } from "./actions"
import GroceryList from "./GroceryList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const groceryList = await getItems();
  return <GroceryList groceryList={groceryList} />;
}
