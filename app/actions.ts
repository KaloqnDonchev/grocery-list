'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitForm(formData: FormData) {
    const groceryItem = formData.get("groceryName") as string;
    const imagePath = formData.get("imagePath") as string;

    await prisma.list.create({
        data: {
            name: groceryItem
        }
    });

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