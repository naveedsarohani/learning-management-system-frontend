import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import Table from '../../components/global/Table';
import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import { Link } from "react-router-dom";
import blueprint from "../../uitils/blueprint";
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global";
import { useDelete } from "../../contexts/Delete";
import answer from "../../uitils/api/answer";

export default function Allanswer() {
    const { destroy } = useDelete();
    const { handler } = useHandler();
    const { credentials: { user, token } } = useAuth();
    const [answers, setanswers] = useState([blueprint.answer]);

    useEffect(() => {
        answer.all(token, setanswers, handler);
    }, [handler.navigate, user]);

    return <DashboardPageCompement title={'all answers'}>
        <h1>The all answers are below in a table form</h1>
        <Table
            ths={<>
                <th>Sno.</th>
                <th>Question</th>
                <th>Answer Text</th>
                <th>Is Correct</th>
                <th>Created On</th>
                <th>Action</th>
            </>}

            tds={!isNullOrEmpty(answers) && answers.map((answer, index) => <tr key={answer.id}>
                <td>{index + 1}</td>
                <td>{answer.question.question_text}</td>
                <td>{answer.answer_text}</td>
                <td>{answer.is_correct}</td>
                <td>{formatDate(answer.created_at)}</td>
                <td>
                    <Link to={'./' + answer.id}>View</Link>
                    <Link to={'./edit/' + answer.id}>Edit</Link>
                    <button onClick={() => destroy('/answers', answer.id, 'answer')}>Delete</button>
                </td>
            </tr>)}
        />
    </DashboardPageCompement>
}