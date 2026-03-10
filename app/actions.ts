'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import OpenAI from "openai"
import { put } from "@vercel/blob"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function submitForm(prevState: unknown, formData: FormData) {
  const groceryItem = formData.get("groceryName") as string;

    // check database for already existing item
  const existingItem = await prisma.list.findFirst({
    where: { name: groceryItem }
  })

  if (existingItem) {
    return { error: "Item already exists" }
  }

    // check if image with the same name has already been generated
  let imageUrl: string
  const cachedImage = await prisma.generatedImage.findUnique({ where: { name: groceryItem } })

  if (cachedImage) {
      imageUrl = cachedImage.url
  } else {
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
    imageUrl = blob.url

      // save to image cache permanently
    await prisma.generatedImage.create({ data: { name: groceryItem, url: imageUrl } })
  }

    // save to DB
  await prisma.list.create({
    data: {
      name: groceryItem,
      image: imageUrl
    }
  })

  revalidatePath("/");
  return { success: "Item added!" }
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