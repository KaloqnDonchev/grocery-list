'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import OpenAI from "openai"
import fs from "fs"
import path from "path"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function submitForm(formData: FormData) {
  const groceryItem = formData.get("groceryName") as string

  const fileName = `${groceryItem}.png`;
  const filePath = path.join(process.cwd(), "public/icons", fileName);

  if (!fs.existsSync(filePath)) {
      // generate image
    const image = await client.images.generate({
      model: "gpt-image-1-mini",
      prompt: `a minimalist professional image of ${groceryItem}`,
      size: "1024x1024",
      quality: "low",
    })

      // save locally
    const imageBase64 = image.data?.[0]?.b64_json
    const buffer = Buffer.from(imageBase64 as string, "base64")
    fs.writeFileSync(filePath, buffer)
  }

    // save to DB
  await prisma.list.create({
    data: {
      name: groceryItem
    },
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