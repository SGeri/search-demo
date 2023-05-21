import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY as string,
});

const client = new OpenAIApi(configuration);

export { client };
