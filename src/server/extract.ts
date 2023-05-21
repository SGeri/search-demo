import WordExtractor from "word-extractor";

const extractor = new WordExtractor();

export default async function extractText(
  mime: string,
  buffer: Buffer
): Promise<string> {
  switch (mime) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await fromWord(buffer);

    default:
      throw new Error("Unsupported file type");
  }
}

async function fromWord(buffer: Buffer) {
  return extractor.extract(buffer).then((res) => res.getBody());
}
