"use server"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function generateChunks(docsURL: string) {

    const downloadURL = docsURL;

    if (!downloadURL) {
        throw new Error("Download URL not found");
    }

    const response = await fetch(downloadURL);

    const data = await response.blob();

    const pdfLoader = new PDFLoader(data);

    const docs = await pdfLoader.load();

    const splitter = new RecursiveCharacterTextSplitter();

    const chunks = await splitter.splitDocuments(docs);

    return chunks;
}
