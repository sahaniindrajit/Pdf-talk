"use client";

import getFileInfo from "@/actions/getFileInfo";
import Navbar from "@/components/navbar";
import PdfTalk from "@/components/pdfTalk";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CenteredLoadingComponent } from "@/components/loadingComponent";
import { NoFilesFoundComponent } from "@/components/noFileComp";

const DocumentPreview: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fileExists, setFileExists] = useState(true);
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const pathname = usePathname();
    const id = pathname.split('/').filter(Boolean).pop() || "";

    useEffect(() => {
        async function fileData(fileId: string) {
            setIsLoading(true);
            try {
                const fileExist = await getFileInfo(fileId);

                if (!fileExist?.fileUrl) {
                    setFileExists(false);
                } else {
                    setFileExists(true);
                    setFileName(fileExist.fileName || "");
                    setFileUrl(fileExist.fileUrl || "");
                }
            } catch (error) {
                console.error("Error fetching file info:", error);
                setFileExists(false);
            } finally {
                setIsLoading(false);
            }
        }

        fileData(id);
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-900" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

                .pixelated {
                    image-rendering: pixelated;
                    image-rendering: crisp-edges;
                }

                .pixel-border {
                    box-shadow: 
                        -4px 0 0 0 #000,
                        4px 0 0 0 #000,
                        0 -4px 0 0 #000,
                        0 4px 0 0 #000;
                }

                .pixel-text {
                    text-shadow: 
                        2px 2px 0 #000,
                        -2px -2px 0 #000,
                        2px -2px 0 #000,
                        -2px 2px 0 #000;
                }
            `}</style>
            <Navbar />
            {isLoading ? (
                <CenteredLoadingComponent />
            ) : (
                fileExists ? (
                    <PdfTalk fileName={fileName} fileUrl={fileUrl} />
                ) : (
                    <NoFilesFoundComponent />
                )
            )}
        </div>
    );
};

export default DocumentPreview;
