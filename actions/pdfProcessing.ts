/* eslint-disable @typescript-eslint/no-explicit-any */
import pdfToText from 'react-pdftotext'
import { HfInference } from '@huggingface/inference';

// Initialize the client with your API key
const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);  // Replace with your actual API key

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
            model: 'sentence-transformers/all-MiniLM-L6-v2', // You can change the model if needed
            inputs: chunks,
        });
        return result;
    } catch (error) {
        console.error("Error generating embeddings:", error);
        throw error;
    }
}

export function textProcessing(event: any, chunkSize: number) {
    extractText(event)
        .then((text) => {
            const chunks = chunkText(text, chunkSize);
            getEmbeddingsForChunks(chunks).then(embeddings => {
                console.log(embeddings);
            })
        })
        .catch((err) => {
            console.error("Error during text processing:", err);
        });
}

