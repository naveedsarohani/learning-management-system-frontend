import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/Authentication";
import { useHandler } from "../contexts/Handler";
import Register from "../layouts/authentication/Register";
import Login from '../layouts/authentication/Login'
import NotFound404 from "../layouts/404";
import { roleBaseRedirection } from "../uitils/functions/global";

export default function Authentication() {
    const { credentials: { user } } = useAuth();
    const { handler: { navigate } } = useHandler();

    useEffect(() => {
        user && roleBaseRedirection(user.role, navigate);
    }, [navigate, user]);

    return !user && <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Unknow route */}
        <Route path="*" element={<NotFound404 />} />
    </Routes>
}