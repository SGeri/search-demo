import extractText from "@/server/extract";
import { NextResponse } from "next/server";
import { client, index } from "@/server/services/elastic";
import { revalidatePath } from "next/cache";

type Input = {
  name: string;
  type: string;
  size: number;
  buffer: string;
};

export async function POST(req: Request) {
  const body: Input = await req.json();
  const buffer = Buffer.from(body.buffer, "base64");

  const text = await extractText(body.type, buffer);

  await client.indices.refresh({ index });

  await client.index({
    index,
    document: {
      type: "document",
      name: body.name,
      body: text,
    },
  });

  revalidatePath("/");

  return NextResponse.json({ sucess: true });
}
