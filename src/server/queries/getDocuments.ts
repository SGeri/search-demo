import { Document } from "@/types";
import { client, index } from "../services/elastic";

export default async function getDocuments() {
  await client.indices.refresh({ index });

  const { hits } = await client.search<Document>({
    index,
    query: {
      match_all: {},
    },
  });

  return hits.hits;
}
