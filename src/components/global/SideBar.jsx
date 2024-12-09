import { Link } from "react-router-dom";
import { role } from "../../uitils/functions/constants";


export default function SideBar({ userRole }) {
    return <aside>
        <div>LMS</div>
        <ul>
            {userRole === role.ADMIN && <li><Link to={'/instructors'}>Instructor</Link></li>}
            <li><Link to={'/courses'}>Courses</Link></li>
        </ul>
    </aside >
}