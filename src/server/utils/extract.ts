import WordExtractor from "word-extractor";
import { PDFExtract } from "pdf.js-extract";

const extractor = new WordExtractor();
const pdfExtractor = new PDFExtract();

export default async function extractText(
  mime: string,
  buffer: Buffer
): Promise<string> {
  switch (mime) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await fromWord(buffer);

    case "application/pdf":
      return await fromPDF(buffer);

    default:
      throw new Error("Unsupported file type");
  }
}

async function fromWord(buffer: Buffer): Promise<string> {
  return extractor
    .extract(buffer)
    .then((res) => res.getBody())
    .catch((err) => {
      throw new Error(err);
    });
}

async function fromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve) => {
    pdfExtractor.extractBuffer(buffer, {}, (err, res) => {
      if (err) throw new Error(err.message);
      if (!res) throw new Error("No result");

      const text = res.pages
        .map((page) =>
          page.content
            .filter((content) => !!content.str.trim())
            .map((content) => content.str)
            .join(" ")
        )
        .join("\n");

      resolve(text);
    });
  });
}
