import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt, name } = await req.json();

  const image = await client.images.generate({
    model: "gpt-image-1-mini",
    prompt,
    size: "1024x1024",
    quality: "low"
  });

  const imageBase64 = image.data?.[0].b64_json;

  const buffer = Buffer.from(imageBase64 as string, "base64");

  const filePath = path.join(process.cwd(), "public/icons", `${name}.png`);

  fs.writeFileSync(filePath, buffer);

  return Response.json({
    image: image.data?.[0]?.url ?? ""
  });
}