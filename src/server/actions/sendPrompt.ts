"use server";

import { Document } from "@/types";
import { client as elasticClient, index } from "../services/elastic";
import { client as gptClient } from "../services/gpt";

const language = "English";

export default async function sendPrompt(prompt: string): Promise<string> {
  await elasticClient.indices.refresh({ index });

  const result = await elasticClient.search({
    index,
    query: {
      bool: {
        must: [
          {
            match: {
              body: {
                query: prompt,
                analyzer: "standard",
              },
            },
          },
        ],
      },
    },
  });

  // display results
  console.log(
    result.hits.hits
      .map((h) => (h._source as any).name + " " + h._score)
      .join("\n")
  );

  // get the top 3 processed results
  const topResults = result.hits.hits
    .sort((a, b) => (b._score ? b._score : 0) - (a._score ? a._score : 0))
    .slice(0, 3)
    .map((h) => h._source as Document);

  const rawDocuments = topResults
    .map((r) => `Document name: ${r.name}\n\nDocument body: ${r.body}`)
    .join("\n\n---\n\n");

  // get the top 3 results from GPT
  const completion = await gptClient.createCompletion({
    model: "text-davinci-003",
    max_tokens: 256,
    prompt: `
Answer the following question based on the provided documents. The answer should be in a formatted output and should summarize the answer in maximum a few sentences.

The Question: "${prompt}"
The language of the answer should be: "${language}"
    
The documents (split by ---):
${rawDocuments}
    `,
  });

  const answer = completion.data.choices[0].text;

  return answer as string;
}
