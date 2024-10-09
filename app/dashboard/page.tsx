"use client";
import React from 'react'
import Navbar from '@/components/navbar';
import Document from '@/components/document';

function Dashboard() {
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
                <Document />

            </div>

        </>
    )
}

export default Dashboard