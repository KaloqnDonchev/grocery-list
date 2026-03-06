'use client'

import Form from "next/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitForm, removeItem } from "./actions"
import { GroceryItem } from "@/types";
import { useState } from "react";

export default function GroceryList({ groceryList }: { groceryList: GroceryItem[]}) {
    const [image, setImage] = useState("");
    const [promptText, setPromptText] = useState("");

    const generateImage = async () => {
        const result = await fetch("/api/generate-image", {
            method: "POST",
            body: JSON.stringify({
            prompt: `a minimalist proffesional image of ${promptText} `,
            name: promptText
            }),
        });

        const data = await result.json();
        
        setImage(data.image);
    };

    return (
    <>
        <h1 className="text-6xl text-center mt-15 font-serif">Grocery Shopping List App</h1>
        <h2 className="text-xl text-center mt-5 font-serif">AI powered</h2>
        <Form action={submitForm} className="text-center mt-15">
            <input type="hidden" name="imagePath" value={image} />
            <Input 
                type="text"
                name="groceryName"
                placeholder="Enter grocery item"
                className="bg-sky-50 w-2xs"
                onChange={(event) => setPromptText(event.target.value)}/>
            <Button type="submit" className="ml-8 w-20 bg-gray-500" onClick={() => generateImage()}>Submit</Button>
        </Form>
        <ul>
            {groceryList.map((item) => (
                <li key={item.id} className="text-center mt-10 border-2 rounded-md border-zinc-400">
                    {image && <img src={image} alt="AI generated image" />}
                    {item.name}
                    <Button variant="destructive" className="ml-3 bg-red-500 hover:bg-red-600" onClick={() => removeItem(item.id)}>Remove</Button>
                </li>
            ))}
        </ul>
    </>
    );
}
