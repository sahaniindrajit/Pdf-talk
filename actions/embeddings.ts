"use server";
import index from "@/lib/pinecone";
/* eslint-disable @typescript-eslint/no-explicit-any */
//import { HumanMessage, AIMessage } from "@langchain/core/messages";
//import { ChatPromptTemplate } from "@langchain/core/prompts";
//import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
//import { createRetrievalChain } from "langchain/chains/retrieval";
//import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
//import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { generateChunks } from "./textProcessing";
import { HfInference } from '@huggingface/inference';
//import { ChatGroq } from "@langchain/groq";
{/*
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
  temperature: 0.2,
});*/}
const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);


async function getEmbeddingsForChunks(chunks: any) {
  try {
    const result = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: chunks,
    });
    return result;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

export async function storeEmbeddingsInPinecone(docsID: string, docsURL: string) {

  const chunks = await generateChunks(docsURL);

  const pageContents = chunks.map((chunk: any) => chunk.pageContent);

  const embeddings = await getEmbeddingsForChunks(pageContents);

  for (let i = 0; i < embeddings.length; i++) {
    const embedding = embeddings[i];

    // Check if embedding is valid before proceeding
    if (!Array.isArray(embedding)) {
      console.error(`Embedding at index ${i} is invalid`);
      continue;
    }

    await index.namespace(docsID).upsert([

      {
        id: `chunk-${i}`,
        values: embedding as any,
        metadata: { docs: docsID }
      }
    ]);
  }


}