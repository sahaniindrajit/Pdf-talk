"use server"
import { getServerSession } from "next-auth";
import prisma from "@/db";
export default async function createUser() {
    const session = await getServerSession();
    const existingUser = await prisma.user.findFirst({
        where: {
            email: session?.user?.email || ""
        }
    })
    if (existingUser) {
        return
    }

    await prisma.user.create({
        data: {
            name: session?.user?.name || "",
            email: session?.user?.email || ""
        }
    })

}