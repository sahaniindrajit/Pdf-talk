"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DocumentPreview {
    fileName: string
}
export const DocumentPreview = ({ fileName }: DocumentPreview) => (
    <Card className="bg-gray-800 text-white h-full pixel-border flex flex-col">
        <CardHeader>
            <CardTitle className="text-lg truncate">{fileName}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
            <div className="w-full h-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <iframe
                    src="https://firebasestorage.googleapis.com/v0/b/pdf-talk-2391e.appspot.com/o/pdf-upload%2FSEM%203_.pdf%202024-10-11%2009%3A55%3A00?alt=media&token=7b31532d-14bd-4316-b6f9-251e2b9a654e"
                    width="100%"
                    height="100%"
                    title="Document Preview"
                    style={{
                        border: 'none',
                        minHeight: '500px',
                        maxHeight: '100vh',
                        overflow: 'auto'
                    }}
                />
            </div>
        </CardContent>


    </Card>
)