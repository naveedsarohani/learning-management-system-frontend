import { useAuth } from "../contexts/Authentication";
import { isNullOrEmpty } from "../uitils/functions/global";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "../layouts/profile";
import UpdatePassword from "../layouts/profile/UpdatePassword";
import NotFound404 from "../layouts/404";
import { useEffect } from "react";
import { useHandler } from "../contexts/Handler";
import Navbar from "../components/global/navbar";

export default function Profile() {
    const { credentials: { user } } = useAuth();
    const { handler: { navigate } } = useHandler();

    useEffect(() => {
        if (isNullOrEmpty(user)) navigate(-1);
    }, []);

    return !isNullOrEmpty(user) && <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col p-4">
            {/* Navbar */}
            <div className="w-full">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pl-6">
                <Routes>
                    <Route path="/" element={<ProfilePage />} />

                    {/* unknow route */}
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
            </div>
        </div>
    </div>
}