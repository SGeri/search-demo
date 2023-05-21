import { client, index } from "@/server/services/elastic";
import { Document } from "@/types";

async function getDocuments() {
  const { hits } = await client.search<Document>({
    index,
    query: {
      match_all: {},
    },
  });

  return hits.hits;
}

export default async function ListView() {
  const documents = await getDocuments();

  return (
    <div className="flex flex-col gap-2">
      {documents.map(({ _source: document }) => (
        <div className="border-2 border-black rounded-lg p-2 focus:outline-none">
          <p className="text-blue-800">{document?.name}</p>
          <p className="text-gray-600">{document?.type}</p>
        </div>
      ))}
    </div>
  );
}
