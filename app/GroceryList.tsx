'use client'

import { useState, useEffect } from "react"
import Form from "next/form"
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitForm, removeItem } from "./actions"
import { GroceryItem } from "@/types"
import { useActionState } from "react"
import { Item, ItemTitle, ItemMedia, ItemContent, ItemActions, ItemGroup } from "@/components/ui/item"
import { ShoppingCart, Sun, Moon } from "lucide-react"

export default function GroceryList({ groceryList }: { groceryList: GroceryItem[] }) {
    const [state, action, isPending] = useActionState(submitForm, null)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('theme')
        if (stored === 'dark') {
            setDark(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleDark = () => {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle('dark', next)
        localStorage.setItem('theme', next ? 'dark' : 'light')
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="size-5 text-primary" />
                        <span className="font-semibold text-lg">Grocery List</span>
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                            AI powered
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle dark mode">
                        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-8">
                <Form action={action} className="flex gap-2">
                    <Input
                        type="text"
                        name="groceryName"
                        placeholder="Add a grocery item..."
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Adding..." : "Add"}
                    </Button>
                </Form>
                {state?.error && <p className="text-red-500 mt-2 text-sm">{state.error}</p>}
                {state?.success && <p className="text-green-500 mt-2 text-sm">{state.success}</p>}

                {groceryList.length === 0 ? (
                    <div className="mt-16 text-center text-muted-foreground">
                        <ShoppingCart className="mx-auto mb-3 size-12 opacity-30" />
                        <p>Your list is empty. Add your first item above.</p>
                    </div>
                ) : (
                    <ItemGroup className="mt-6 gap-2">
                        {groceryList.map((item) => (
                            <Item key={item.id} variant="outline" className="bg-muted">
                                <ItemMedia variant="image" className="size-20 rounded-md">
                                    <Image
                                        src={item.image || '/placeholder.png'}
                                        width={80}
                                        height={80}
                                        alt={item.name}
                                    />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="text-base capitalize">{item.name}</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </ItemActions>
                            </Item>
                        ))}
                    </ItemGroup>
                )}
            </main>
        </div>
    )
}
