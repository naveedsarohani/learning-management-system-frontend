import { useEffect } from "react";
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler";
import { capEach } from "../../uitils/functions/global";

export default function StudentProfile() {
    const { credentials: { user }, user: { revoke } } = useAuth();
    const { handler: { navigate, location } } = useHandler();

    useEffect(() => {
        if (!user || user.role !== 'student') {
            navigate(-1);
        };
    }, [location.pathname, user]);

    return user && <div>
        <h1>{capEach(user.name)} - Profile Page</h1>
        <button onClick={revoke}>Logout Now</button>
    </div>
}