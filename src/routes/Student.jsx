import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/Authentication";
import { useHandler } from "../contexts/Handler";
import NotFound404 from "../layouts/404";
import { role } from "../uitils/functions/constants";
import { useEffect } from "react";
import SideBar from "../components/global/SideBar";
import Navbar from "../components/global/navbar";

export default function Student() {
    const { credentials: { user } } = useAuth();
    const { handler } = useHandler();

    useEffect(() => {
        if (user) {
            if (user.role !== role.STUDENT) handler.navigate(-1);
        } else handler.navigate('/auth/login', { replace: true });
    }, [handler.navigate, user]);

    return user && user.role == role.STUDENT && <>
        <Navbar />
        <div>
            <SideBar userRole={user.role} />
            <Routes>
                <Route path="/" element={<h1>Student Prfile Index Page</h1>} />

                {/* Unknow route */}
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </div>
    </>
}