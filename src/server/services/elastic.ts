import { Client } from "@elastic/elasticsearch";

const index = "documents";

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID as string,
  },
  auth: {
    username: process.env.ELASTIC_AUTH_USERNAME as string,
    password: process.env.ELASTIC_AUTH_PASSWORD as string,
  },
});

export { client, index };
