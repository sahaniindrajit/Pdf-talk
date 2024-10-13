"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Bot } from "lucide-react"
import Image from 'next/image';
import { useSession } from "next-auth/react";

interface ChatMessage {
    isAi: boolean,
    message: string
}

const ChatMessage = ({ isAi, message }: ChatMessage) => {
    const { data: session } = useSession();

    return (
        <div className={`flex items-start mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}>
            {isAi && (
                <div className="bg-blue-500 rounded-full p-2 mr-2">
                    <Bot className="h-4 w-4 text-white" />
                </div>
            )}
            <div className={`max-w-[70%] p-3 rounded-lg pixel-border ${isAi ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'}`}>
                <p className="text-sm">{message}</p>
            </div>
            {!isAi && (
                <div className=" rounded-full p-2 ml-2">
                    {(session?.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="User Image"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    )) || <User className="h-4 w-4 bg-green-500 text-white" />}
                </div>
            )}
        </div>
    )
}

export const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { isAi: true, text: "Hello! I'm your AI assistant. How can I help you with this document?" },
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { isAi: false, text: input }])
            setInput('')
            // Simulate AI response
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { isAi: true, text: `I received your message: "${input}". The ai chat is still under production` }])
            }, 1000)
        }
    }

    return (
        <Card className="bg-gray-800 text-white h-full pixel-border flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg">Chat with AI</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <ScrollArea className="flex-grow mb-4 pr-4 h-[calc(100vh-250px)]">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} isAi={msg.isAi} message={msg.text} />
                    ))}
                    <div ref={messagesEndRef} />
                </ScrollArea>
                <div className="flex mt-4">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow mr-2 bg-gray-700 text-white border-none pixel-border"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button onClick={handleSend} className="pixel-border bg-blue-500 hover:bg-blue-600 text-white">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
