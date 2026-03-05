'use server'

import { prisma } from "@/lib/prisma"

export async function submitForm(formData: FormData) {
    const groceryItem = formData.get("groceryName") as string;
    await prisma.list.create({
        data: {
            name: groceryItem
        }
    })
}