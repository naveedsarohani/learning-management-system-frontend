import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/Authentication"
import { useHandler } from "../contexts/Handler"
import Navbar from "../components/global/navbar"
import { role } from "../uitils/functions/constants"
import NotFound404 from "../layouts/404"
import Home from "../layouts/public"

export default function Public() {
    return <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ">
            {/* Navbar */}
            <div className="w-full">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pl-6">
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Unknown Route */}
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
            </div>
        </div>
    </div>
}
