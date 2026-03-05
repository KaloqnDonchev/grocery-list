import Form from "next/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitForm } from "./actions"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const groceryList = await prisma.list.findMany();

  return (
    <>
      <h1 className="text-6xl text-center mt-15 font-serif">Grocery Shopping List App</h1>
      <Form action={submitForm} className="text-center mt-15">
        <Input type="text" name="groceryName" placeholder="Enter grocery item" className="bg-sky-50 w-2xs"/>
        <Button type="submit" className="ml-8 w-20 bg-gray-500">Submit</Button>
      </Form>
      <ul>
        {groceryList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
