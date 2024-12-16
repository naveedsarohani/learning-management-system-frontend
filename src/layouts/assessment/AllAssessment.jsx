import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import Table from '../../components/global/Table';
import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import { Link } from "react-router-dom";
import blueprint from "../../uitils/blueprint";
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global";
import { useDelete } from "../../contexts/Delete";
import question from "../../uitils/api/question";

export default function Allquestion() {
    const { destroy } = useDelete();
    const { handler } = useHandler();
    const { credentials: { user, token } } = useAuth();
    const [questions, setquestions] = useState([blueprint.question]);

    useEffect(() => {
        question.all(token, setquestions, handler);
    }, [handler.navigate, user]);

    return <DashboardPageCompement title={'all questions'}>
        <h1>The all questions are below in a table form</h1>
        <Table
            ths={<>
                <th>Sno.</th>
                <th>Title</th>
                <th>Type</th>
                <th>Time Limit</th>
                <th>Tetakes Allowed</th>
                <th>Created On</th>
                <th>Action</th>
            </>}

            tds={!isNullOrEmpty(questions) && questions.map((question, index) => <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.title}</td>
                <td>{question.type}</td>
                <td>{question.time_limit}</td>
                <td>{question.retakes_allowed}</td>
                <td>{formatDate(question.created_at)}</td>
                <td>
                    <Link to={'./' + question.id}>View</Link>
                    <Link to={'./edit/' + question.id}>Edit</Link>
                    <button onClick={() => destroy('/questions', question.id, question.title + ' question')}>Delete</button>
                </td>
            </tr>)}
        />
    </DashboardPageCompement>
}