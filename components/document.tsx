import React, { useState } from 'react'
import { FileText } from "lucide-react"
import { DocumentCard } from './documentCard'
import { UploadCard, UploadDialog } from './uploadDocument'




export default function Document() {
    const [documents, setDocuments] = useState([
        { id: 1, title: "Project Proposal", date: "2023-06-15" },
        { id: 2, title: "Meeting Notes", date: "2023-06-14" },
        { id: 3, title: "Research Paper", date: "2023-06-13" },
    ])
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    const handleUpload = (file: File) => {
        const newDoc = {
            id: documents.length + 1,
            title: file.name,
            date: new Date().toISOString().split('T')[0]
        }
        setDocuments([...documents, newDoc])
    }

    const handleDelete = (id: number) => {
        setDocuments(documents.filter(doc => doc.id !== id))
    }

    const handlePreview = (id: number) => {
        // Implement preview functionality here
        console.log(`Previewing document with id: ${id}`)
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        
        .pixel-border {
          box-shadow: 
            -2px 0 0 0 #000,
            2px 0 0 0 #000,
            0 -2px 0 0 #000,
            0 2px 0 0 #000;
        }
      `}</style>

            <div className="max-w-6xl mx-auto">
                <header className="flex items-center mb-6">
                    <FileText className="h-8 w-8 text-red-500 mr-4" />
                    <h1 className="text-2xl font-bold text-white">My Documents</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <UploadCard onUpload={() => setIsUploadOpen(true)} />
                    {documents.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            title={doc.title}
                            date={doc.date}
                            onDelete={() => handleDelete(doc.id)}
                            onPreview={() => handlePreview(doc.id)}
                        />
                    ))}
                </div>
            </div>

            <UploadDialog
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUpload={handleUpload}
            />
        </div>
    )
}