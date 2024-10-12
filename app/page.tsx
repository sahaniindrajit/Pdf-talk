"use client"
import { MouseEventHandler } from 'react';
import React from 'react'
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useRouter } from 'next/navigation';
import Image from 'next/image';


interface OnClickProps {
  onclick: MouseEventHandler<HTMLButtonElement>;
}

const NavBar: React.FC<OnClickProps> = ({ onclick }) => (
  <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <div className="flex items-center">
      <div className=" h-10 mr-2  flex items-center justify-center">
        <Image
          src='/logo.png'
          alt="User Image"
          width={60}
          height={60}
        />
      </div>
      <span className="text-xl font-bold">PDF TALK</span>
    </div>
    <Button
      variant="outline"
      className="pixel-border bg-white text-black hover:bg-gray-300 hover:text-black border-2 border-black transition-colors duration-200"
      onClick={onclick}>
      <User className="mr-2 h-4 w-4" /> Sign In
    </Button>
  </nav>
)

const HeroSection: React.FC<OnClickProps> = ({ onclick }) => (

  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-900 text-white p-4">
    <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 pixel-text">Welcome to PDF TALK</h1>
    <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl pixel-text">
      Revolutionize your document interactions with AI-powered conversations
    </p>
    <Button className="pixel-border text-lg px-8 py-4 bg-red-500 hover:bg-red-600 text-white transition-colors duration-200" onClick={onclick}>
      Get Started
    </Button>
  </div>
)

export default function Home() {
  const router = useRouter();

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

      <NavBar onclick={() => router.push('/signin')} />
      <HeroSection onclick={() => router.push('/signin')} />
    </div>
  )
}