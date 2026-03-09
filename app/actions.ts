'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import OpenAI from "openai"
import { put } from "@vercel/blob"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function submitForm(formData: FormData) {
  const groceryItem = formData.get("groceryName") as string;

    // generate image
  const image = await client.images.generate({
    model: "gpt-image-1-mini",
    prompt: `a minimalist professional image of ${groceryItem}`,
    size: "1024x1024",
    quality: "low",
  })

    // save to base64 in vercel blob
  const imageBase64 = image.data?.[0]?.b64_json
  const buffer = Buffer.from(imageBase64 as string, "base64")
  let blob = await put(`${groceryItem}.png`, buffer, {
    access: "public",
    allowOverwrite: true
  })

    // save to DB
  await prisma.list.create({
    data: {
      name: groceryItem,
      image: blob!.url
    }
  })

  revalidatePath("/");
}

export async function getItems() {
  return await prisma.list.findMany();
}

export async function removeItem(itemId: number) {
    await prisma.list.delete({
      where: {
        id: itemId
      }
    })

    revalidatePath("/");
}