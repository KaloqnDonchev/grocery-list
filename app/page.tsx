import { getItems } from "./actions"
import GroceryList from "./GroceryList";

export default async function Home() {
  const groceryList = await getItems();
  return <GroceryList groceryList={groceryList} />;
}
