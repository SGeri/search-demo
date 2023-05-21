"use server";

import { client, index } from "../services/elastic";

export default async function deleteDocument(documentId: string) {
  await client.indices.refresh({ index });

  await client.delete({
    index,
    id: documentId,
  });

  return { success: true };
}
