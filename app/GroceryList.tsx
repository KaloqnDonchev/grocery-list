'use client'

import Form from "next/form";
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitForm, removeItem } from "./actions"
import { GroceryItem } from "@/types";
import { useActionState } from "react";
import { Item, ItemTitle } from "@/components/ui/item";

export default function GroceryList({ groceryList }: { groceryList: GroceryItem[]}) {
    const [state, action, isPending] = useActionState(submitForm, null)
    
    return (
    <>
        <h1 className="text-6xl text-center mt-15 font-serif">Grocery Shopping List App</h1>
        <h2 className="text-xl text-center mt-5 font-serif">AI powered</h2>
        <Form action={action} className="text-center mt-15">
            <Input 
                type="text"
                name="groceryName"
                placeholder="Enter grocery item"
                className="bg-sky-50 w-2xs"/>
            <Button type="submit" className="ml-8 w-20 bg-gray-500">
                {isPending ? "Adding..." : "Add"}
            </Button>
            {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
            {state?.success && <p className="text-green-500 mt-2">{state.success}</p>}
        </Form>
        <ul className="flex flex-col items-center w-full mt-10 px-4">
            {groceryList.map((item) => {
                return (
                    <Item 
                        key={item.id} 
                        className="flex items-center gap-4 mt-4 p-3 border-2 rounded-md border-zinc-400 w-full max-w-2xl"
                    >
                        <Image 
                            src={item.image || '/placeholder.png'} 
                            width={80} 
                            height={80} 
                            alt={item.name}
                            className="rounded-md object-cover shrink-0"
                        />
                        <ItemTitle className="flex-1">
                            {item.name}
                        </ItemTitle>
                        <Button
                            variant="destructive"
                            className="ml-auto bg-red-500 hover:bg-red-600"
                            onClick={() => removeItem(item.id)}>
                            Remove
                        </Button>
                    </Item>
                )
            })}
        </ul>
    </>
    );
}
