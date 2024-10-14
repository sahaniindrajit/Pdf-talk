"use server"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function generateChunks(docsURL: string) {

    const downloadURL = docsURL;

    if (!downloadURL) {
        throw new Error("Download URL not found");
    }

    console.log("----Download URL Found Successfully----");

    const response = await fetch(downloadURL);

    const data = await response.blob();

    console.log("----Loading PDF Document----");

    const pdfLoader = new PDFLoader(data);

    const docs = await pdfLoader.load();

    console.log("----Splitting Document into smaller chunks----");

    const splitter = new RecursiveCharacterTextSplitter();

    const chunks = await splitter.splitDocuments(docs);

    console.log(`----Splitting Done, ${chunks.length} chunks found----`);

    return chunks;
}
