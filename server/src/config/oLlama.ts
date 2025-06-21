import { OllamaEmbeddings, ChatOllama } from "@langchain/ollama";
import ENV from "./env";


export const embeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large",
  baseUrl: ENV.O_LLAMA_URL, 
  maxConcurrency: 5,
});

export const model = new ChatOllama({
    model: "llama3.1",
    baseUrl: ENV.O_LLAMA_URL,
    temperature: .6
})