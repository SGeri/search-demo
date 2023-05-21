import ListView from "@/components/ListView";
import Picker from "@/components/Picker";
import Prompt from "@/components/Prompt";
import { client, index } from "@/server/services/elastic";

async function getDocuments() {
  await client.indices.refresh({ index });

  const { hits } = await client.search<Document>({
    index,
    query: {
      match_all: {},
    },
  });

  return hits.hits;
}

export default async function Home() {
  const documents = await getDocuments();

  return (
    <main className="flex flex-col items-center justify-between mx-5 py-8 gap-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Advanced Search</h1>
        <h2>
          A demo project to showcase the ability of ElasticSearch combined with
          GPT-3
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Block title="Documents" className="h-[650px]">
          {/* @ts-expect-error */}
          <ListView documents={documents} />
        </Block>
        <Block title="Upload">
          <Picker />
        </Block>
      </div>

      <Block title="Search" className="w-[80%] max-w-4xl">
        <Prompt />
      </Block>
    </main>
  );
}

type BlockProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

function Block({ title, className, children }: BlockProps) {
  return (
    <div
      className={`border-2 border-blue-300 px-20 py-8 rounded-md shadow-2xl ${className}`}
    >
      <h3 className="text-center font-md font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}
