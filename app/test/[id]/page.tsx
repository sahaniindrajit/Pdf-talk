"use client"
import Navbar from '@/components/navbar';
import PdfTalk from '@/components/pdfTalk';
import { usePathname } from 'next/navigation'

import React from 'react'

interface DocumentPreviewProps {
    fileUrl: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = () => {
    const pathname = usePathname()
    const id = pathname.split('/').filter(Boolean).pop();
    return (
        <>
            <p>Current pathname: {pathname}</p>
            <p>Current pathname: {id}</p>
            <Navbar />
            <PdfTalk />
        </>
    );
};


export default DocumentPreview;



