"use client"
import React from 'react'
import { FileText } from "lucide-react"
import UserProfilePopup from './UserProfilePopup';

function Navbar() {
    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-500 mr-2 pixel-border flex items-center justify-center" style={{ boxShadow: 'inset 2px 2px 0 2px #000' }}>
                        <FileText className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold">PDF TALK</span>
                </div>

                <div className='flex items-center'>
                    <UserProfilePopup />

                </div>

            </nav>
        </div>
    )
}

export default Navbar