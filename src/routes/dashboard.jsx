import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/Authentication";
import { useHandler } from "../contexts/Handler";
import Navbar from "../components/global/navbar";
import SideBar from "../components/global/SideBar";
import Courses from "./Courses";
import { role } from "../uitils/functions/constants";
import DashboardHomePage from "../layouts/dashboards";
import NotFound404 from "../layouts/404";
import UpdatePassword from "../layouts/authentication/UpdatePassword";

export default function Dashboard() {
    const { credentials: { user } } = useAuth();
    const { handler } = useHandler();

    useEffect(() => {
        if (user) {
            if (![role.ADMIN, role.INSTRUCTOR].includes(user.role)) handler.navigate(-1);
        } else handler.navigate('/auth/login', { replace: true });
    }, [handler.navigate, user]);

    return user && [role.ADMIN, role.INSTRUCTOR].includes(user.role) && <>
        <Navbar />
        <div>
            <SideBar userRole={user.role} />
            <Routes>
                <Route path="/" element={<DashboardHomePage />} />
                <Route path="/courses/*" element={<Courses />} />
                <Route path="/update-password" element={<UpdatePassword />} />

                {/* Unknow route */}
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </div>
    </>
}