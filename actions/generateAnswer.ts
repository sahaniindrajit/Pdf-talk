/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import index from "@/lib/pinecone";
import getEmbeddingsForChunks from "./getEmbedding";
import { hf } from "@/lib/huggingFaceEmbedding";



export default async function generateAnswer(input: string, id: string) {

    const questionEmbedding = await getEmbeddingsForChunks([input]);

    const results = await index.namespace(id).query({
        vector: questionEmbedding as any,
        topK: 2,
        includeMetadata: true
    });

    const contextChunks = results.matches.map(match => match.metadata?.chunks);

    const answerResponse = await hf.textGeneration({
        model: 'google/flan-t5-large',
        inputs: `Based on the context provided, answer the following question:\n\nContext: ${contextChunks}\n\nQuestion: ${input}\n\nPlease provide a detailed answer:`,
        options: {
            max_length: 512, // Adjust to your needs
            temperature: 0.5, // Adjust for variability
        },
    });
    const answer = answerResponse.generated_text;
    return answer;
}


