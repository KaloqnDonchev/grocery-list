'use client'

import Form from "next/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { submitForm, removeItem } from "./actions"
import { GroceryItem } from "@/types";

export default function GroceryList({ groceryList }: { groceryList: GroceryItem[]}) {
    return (
    <>
        <h1 className="text-6xl text-center mt-15 font-serif">Grocery Shopping List App</h1>
        <h2 className="text-xl text-center mt-5 font-serif">AI powered</h2>
        <Form action={submitForm} className="text-center mt-15">
            <Input 
                type="text"
                name="groceryName"
                placeholder="Enter grocery item"
                className="bg-sky-50 w-2xs"/>
            <Button type="submit" className="ml-8 w-20 bg-gray-500">Submit</Button>
        </Form>
        <ul>
            {groceryList.map((item) => {
                return (
                    <li key={item.id} className="text-center mt-10 border-2 rounded-md border-zinc-400">
                        <Image 
                            src={item.image || '/placeholder.png'} 
                            width={200} 
                            height={200} 
                            alt={item.name} 
                        />
                        {item.name}
                        <Button
                            variant="destructive"
                            className="ml-3 bg-red-500 hover:bg-red-600"
                            onClick={() => removeItem(item.id)}>
                            Remove
                        </Button>
                    </li>
                )
            })}
        </ul>
    </>
    );
}
