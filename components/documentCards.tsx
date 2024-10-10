import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { File, Trash2, FileQuestion, Eye } from "lucide-react"
interface DocumentCardProps {
    title: string;
    date: string;
    onDelete: () => void;
    onPreview: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ title, date, onDelete, onPreview }) => (
    <Card className="bg-gray-700 text-white pixel-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <File className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
            <p className="text-xs text-gray-400">Uploaded: {date}</p>
            <div className="flex justify-between mt-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900 pixel-border"
                    onClick={onPreview}
                >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900 pixel-border"
                    onClick={onDelete}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
            </div>
        </CardContent>
    </Card>
)

export const RetroLoadingIcon = () => (
    <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-400 rounded-full" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
    </div>
)

export const LoadingComponent = () => (
    <Card className="bg-gray-700 text-white pixel-border">
        <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex flex-col items-center">
                <RetroLoadingIcon />
                <p className="mt-4 text-lg text-center">Loading...</p>
            </div>
        </CardContent>
    </Card>
)

export const DeletingComponent = () => (
    <Card className="bg-gray-700 text-white pixel-border">
        <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <RetroLoadingIcon />
                    </div>
                </div>
                <p className="mt-4 text-lg text-center">Deleting...</p>
            </div>
        </CardContent>
    </Card>
)

export const NoDocumentsComponent = () => (
    <Card className="bg-gray-700 text-white pixel-border">
        <CardContent className="flex flex-col items-center justify-center py-12">
            <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg mb-2 text-center">No Documents Found</p>
            <p className="text-sm text-gray-400 text-center">Upload a document to get started</p>
        </CardContent>
    </Card>
)

