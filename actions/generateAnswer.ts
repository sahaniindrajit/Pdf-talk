/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import index from "@/lib/pinecone";
import getEmbeddingsForChunks from "./getEmbedding";


async function queryHuggingFace(data: any) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();
    return result;
}

export default async function generateAnswer(input: string, id: string) {

    const questionEmbedding = await getEmbeddingsForChunks([input]);

    const results = await index.namespace(id).query({
        vector: questionEmbedding as any,
        topK: 5,
        includeMetadata: true
    });

    const contextChunks = results.matches.map(match => match.metadata?.chunks).filter(Boolean);
    console.log(contextChunks)

    const contextString = contextChunks.join(" ").replace(/([a-z])([A-Z])/g, '$1 $2'); // Adding spaces before capital letters for camelCase strings
    //console.log(contextString)
    const queryData = {
        inputs: {
            question: input,
            context: contextString,  // Use the retrieved context for the question
        },
    };

    try {
        // Step 5: Query Hugging Face's document question answering model
        const response = await queryHuggingFace(queryData);

        return (response.answer || response.error);  // Return the generated answer from Hugging Face API
    } catch (error) {
        console.error("Error generating answer:", error);
        throw error;
    }
}


