"use server"
import { getServerSession } from "next-auth";
import prisma from "@/db";

interface createFileDetail {
    fileName: string
    fileUrl: string
    createdAt: string
}
export default async function createFileDetail({ fileName, fileUrl, createdAt }: createFileDetail) {
    const session = await getServerSession();

    await prisma.fileDetail.create({
        data: {
            user: {
                // Use connect to link to an existing user by email
                connect: {
                    email: session?.user?.email || "",  // Connect using the email
                },
            },
            fileName: fileName,
            fileUrl: fileUrl,
            createdAt: createdAt
        }
    })

}