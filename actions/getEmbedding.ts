/* eslint-disable @typescript-eslint/no-explicit-any */
import hf from "@/lib/huggingFaceEmbedding";

export default async function getEmbeddingsForChunks(chunks: any) {
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