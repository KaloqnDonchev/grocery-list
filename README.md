# Grocery List

**Live app:** https://grocery-list-kaloyan.vercel.app/

A personal grocery list app that automatically generates an AI image for each item you add.

## Features

- Add grocery items to your personal list
- Each item gets a minimalist AI-generated image (powered by OpenAI)
- Images are cached globally — if someone has added the same item before, the image loads instantly
- Items are scoped to your session, so each visitor has their own private list
- Remove items when you no longer need them
- Dark mode toggle
- Adding a new item takes 15–20 seconds while the image is being generated

## Tech Stack

- **Next.js** (App Router) with React Server Actions
- **PostgreSQL** via Prisma
- **OpenAI** image generation (`gpt-image-1-mini`)
- **Vercel Blob** for image storage
- **shadcn/ui** + **Tailwind CSS v4** for styling

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database
- An OpenAI API key
- A Vercel Blob store (or swap it out for another storage provider)

### Environment Variables

Create a `.env` file in the root with the following:

```env
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### Install & Run

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.
