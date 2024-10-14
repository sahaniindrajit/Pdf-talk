"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenAIEmbeddings } from "@langchain/openai";
//import { HumanMessage, AIMessage } from "@langchain/core/messages";
//import { ChatPromptTemplate } from "@langchain/core/prompts";
//import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "@langchain/pinecone";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
//import { createRetrievalChain } from "langchain/chains/retrieval";
//import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
//import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import pineconeClient from "@/lib/pinecone";
import { generateChunks } from "./textProcessing";
//import { ChatGroq } from "@langchain/groq";
{/*
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
  temperature: 0.2,
});*/}


async function namespaceExists(
    index: Index<RecordMetadata>,
    namespace: string
) {
    if (!namespace) {
        throw new Error("Namespace not found");
    }

    const { namespaces } = await index.describeIndexStats();

    return namespaces?.[namespace] !== undefined;
}

const indexName = "pdftalk";

export async function generateEmbeddingsInPineconeVectorDB(docID: string, docsURL: string) {


    let pineconeVectorStore;

    console.log("----Generating Embeddings in Pinecone Vector DB----");

    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-ada-002",
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const index = pineconeClient.index(indexName);

    const nameSpaceAlreadyExists = await namespaceExists(index, docID);

    if (nameSpaceAlreadyExists) {
        console.log(
            `---Namespace ${docID} already exists, reusing existing embeddings...---`
        );
        pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            namespace: docID,
        });
        return pineconeVectorStore;
    } else {
        const splitDocs = await generateChunks(docsURL);

        // console.log(
        // `Storing the embeddings in ${docID} in the ${indexName} Pinecone Vector DB`
        // );

        pineconeVectorStore = await PineconeStore.fromDocuments(
            splitDocs,
            embeddings,
            {
                pineconeIndex: index,
                namespace: docID,
            }
        );
        return pineconeVectorStore;
    }
}
{/*
const generateLangchainCompletion = async (docID: string, question: string) => {
  let pineconeStore;

  pineconeStore = await generateEmbeddingsInPineconeVectorDB(docID);
  // console.log("----Creating Langchain Retriever----");
  const retrievalChain = pineconeStore.asRetriever();

  const chatHistory = await fetchMessageFromDB(docID);

  // console.log("Defining a prompt template");

  const historyAwarePromptTemplate = ChatPromptTemplate.fromMessages([
    ...chatHistory,
    ["user", "{input}"],
    [
      "user",
      "Given the conversation above, provide a search query to look up relevant information from the conversation.",
    ],
  ]);

  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: model,
    retriever: retrievalChain,
    rephrasePrompt: historyAwarePromptTemplate,
  });

  // console.log("---Defining a prompt template to answer the question---");

  const questionPromptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user question based on the below content: \n\n {context}",
    ],
    ...chatHistory,
    ["user", question],
  ]);

  const historyCombinedDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt: questionPromptTemplate,
  });

  // console.log("Creating the main retrieval chain");

  const conversationalRetrievalChain = await createRetrievalChain({
    retriever: historyAwareRetrieverChain,
    combineDocsChain: historyCombinedDocsChain,
  });

  const result = await conversationalRetrievalChain.invoke({
    chat_history: chatHistory,
    input: question,
  });

  // console.log(result);
  return result.answer;
};

export { model, generateLangchainCompletion };*/}