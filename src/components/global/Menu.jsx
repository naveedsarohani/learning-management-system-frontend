import { Link } from "react-router-dom";

const Menu = () => {
    return <ul>
        <li><Link to={'/me'}>All Courses</Link> </li>
        <li><Link to={'/me/courses'}>My Course</Link> </li>
        <li><Link to={'/me/exams'}>Exams/Tests</Link> </li>
        <li><Link to={'/me/assessments'}>Assessments</Link> </li>
    </ul>
}
export default Menu;