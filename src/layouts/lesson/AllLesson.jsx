import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import Table from '../../components/global/Table';
import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import lesson from "../../uitils/api/lesson";
import { Link } from "react-router-dom";
import blueprint from "../../uitils/blueprint";
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global";
import { useDelete } from "../../contexts/Delete";

export default function AllLesson() {
    const { destroy } = useDelete();
    const { handler } = useHandler();
    const { credentials: { user, token } } = useAuth();
    const [lessons, setLessons] = useState([blueprint.lesson]);

    useEffect(() => {
        lesson.all(token, setLessons, handler);
    }, [handler.navigate, user]);

    return <DashboardPageCompement title={'all lessons'}>
        <h1>The all lessons are below in a table form</h1>
        <Table
            ths={<>
                <th>Sno.</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created On</th>
                <th>Action</th>
            </>}

            tds={!isNullOrEmpty(lessons) && lessons.map((lesson, index) => <tr key={lesson.id}>
                <td>{index + 1}</td>
                <td>{lesson.title}</td>
                <td>{lesson.content}</td>
                <td>{formatDate(lesson.created_at)}</td>
                <td>
                    <Link to={'./' + lesson.id}>View</Link>
                    <Link to={'./edit/' + lesson.id}>Edit</Link>
                    <button onClick={() => destroy('/lessons', lesson.id, lesson.title + ' lesson')}>Delete</button>
                </td>
            </tr>)}
        />
    </DashboardPageCompement>
}