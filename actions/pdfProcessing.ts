/* eslint-disable @typescript-eslint/no-explicit-any */
import pdfToText from 'react-pdftotext'
import { HfInference } from '@huggingface/inference';
import pineconeClient from '@/lib/pinecone';
import { PineconeStore } from "@langchain/pinecone";
import { Index, RecordMetadata } from "@pinecone-database/pinecone"

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);


function extractText(event: any): Promise<string> {
    const file = event.target.files?.[0];
    if (!file) {
        return Promise.reject(new Error("No file selected")); // Return a rejected promise if no file
    }
    return pdfToText(file)
        .then((text: string) => {
            return text;  // return the extracted text here
        })
        .catch((err: any) => {
            console.error("Failed to extract text from pdf:", err);
            throw err;  // propagate the error if needed
        });
}

function chunkText(text: string, chunkSize: number): string[] {
    const chunks = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        let endIndex = startIndex + chunkSize;

        // Ensure that you do not break a word in the middle
        if (endIndex < text.length) {
            endIndex = text.lastIndexOf(' ', endIndex); // find last space before the cutoff
            if (endIndex === -1) {
                endIndex = text.length; // in case no space is found (for small chunks)
            }
        }

        chunks.push(text.slice(startIndex, endIndex));
        startIndex = endIndex + 1; // Move to next chunk
    }
    return chunks;
}

async function getEmbeddingsForChunks(chunks: string[]) {
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

export const indexName = "pdf-talk";

async function storeEmbeddingsindb(docID: string, chunks: any, embeddings: any) {

    let pineconeVectorStore;

    const index = await pineconeClient.index(indexName);

    const nameSpaceAlreadyExists = await namespaceExists(index, docID);

    if (nameSpaceAlreadyExists) {

        pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            namespace: docID,
        });
        return pineconeVectorStore;
    } else {
        pineconeVectorStore = await PineconeStore.fromDocuments(chunks, embeddings, {
            pineconeIndex: index,
            namespace: docID,
        });
        return pineconeVectorStore;
    }
}

export function textProcessing(event: any, chunkSize: number, docID: string) {
    // Step 1: Extract text from the document
    extractText(event)
        .then((text) => {
            // Step 2: Chunk the extracted text
            const chunks = chunkText(text, chunkSize);

            // Step 3: Get embeddings for the chunks of text
            return getEmbeddingsForChunks(chunks).then((embeddings) => ({
                chunks,
                embeddings
            }));
        })
        .then(({ chunks, embeddings }) => {
            // Step 4: Store embeddings in Pinecone DB
            return storeEmbeddingsindb(docID, chunks, embeddings);
        })
        .then(() => {
            // Step 5: Success message
            console.log("Embeddings stored successfully!");
        })
        .catch((err) => {
            // Error handling for any part of the process
            console.error("Error during text processing:", err);
        });
}
