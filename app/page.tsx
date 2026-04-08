import { getItems, getDailyCount } from "./actions"
import GroceryList from "./GroceryList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [groceryList, dailyCount] = await Promise.all([getItems(), getDailyCount()])
  return <GroceryList groceryList={groceryList} dailyCount={dailyCount} />;
}
