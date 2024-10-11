"use client"
import getFileInfo from '@/actions/getFileInfo';
import Navbar from '@/components/navbar';
import PdfTalk from '@/components/pdfTalk';
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FileQuestion } from 'lucide-react';


const CenteredLoadingComponent = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="flex flex-col items-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-400 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4 text-lg text-center text-white">Loading...</p>
        </div>
    </div>
);


const NoFilesFoundComponent = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="flex flex-col items-center text-center text-white">
            <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg mb-2">No Documents Found</p>
        </div>
    </div>
);

function DocumentPreview() {
    const [isLoading, setIsLoading] = useState(false)
    const [fileExists, setFileExists] = useState(true)
    const [fileName, setFileName] = useState("")
    const [fileUrl, setFileUrl] = useState("")
    const pathname = usePathname()
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

        fileData(id)
    }, [id])

    return (
        <>

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


        </>
    );
};

export default DocumentPreview