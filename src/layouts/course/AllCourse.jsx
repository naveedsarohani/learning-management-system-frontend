import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import Table from '../../components/global/Table';
import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import course from "../../uitils/api/course";
import { Link } from "react-router-dom";

export default function AllCourses() {
    const { handler } = useHandler();
    const { credentials: { user, token } } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        course.all(token, setCourses, handler);
    }, [handler.navigate, user]);

    return <DashboardPageCompement title={'all courses'}>
        <h1>The all courses are below in a table form</h1>

        <Table
            ths={<>
                <th>Sno.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created On</th>
                <th>Action</th>
            </>}

            tds={courses.map((course, index) => <tr>
                <td>{index + 1}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>
                    <Link to={'./' + course.id}>View</Link>
                </td>
            </tr>)}
        />
    </DashboardPageCompement>
}