import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication";
import { Link } from "react-router-dom";
import auth from "../../uitils/api/auth";

export default function Navbar() {
    const { handler } = useHandler();
    const { credentials: { user, token }, user: { revoke } } = useAuth();

    function handleLogout() {
        auth.logout(token, { ...handler, revoke });
    }

    return <header>
        <Link to={'/'}>Learning Management System</Link>
        <nav>
            <ol>
                {user
                    ? <li onClick={handleLogout}><button>Logout</button></li>
                    : <li><Link to={'/auth/login'}>Login</Link></li>
                }
            </ol>
        </nav>
    </header>
}