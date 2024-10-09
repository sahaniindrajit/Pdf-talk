import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { File, Trash2, Eye } from "lucide-react"
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