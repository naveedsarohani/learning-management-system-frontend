import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler";
import exam from "../../uitils/api/exam";
import blueprint from "../../uitils/blueprint";
import ExamCard from "../../components/global/ExamCard";
import { isNullOrEmpty } from "../../uitils/functions/global";
import NoContent from "../../components/global/NoContent";

export default function MyExams() {
    const { credentials: { user, token } } = useAuth();
    const [exams, setExams] = useState([blueprint.exam]);
    const { handler } = useHandler();

    useEffect(() => {
        exam.all(token, setExams, handler);
    }, [location.pathname, user]);

    return <div>
        <h1>All Exams</h1>
        {!isNullOrEmpty(exams[0].id)
            ? exams.map(exam => <ExamCard exam={exam} />)
            : <NoContent message="there is not any exam or test for you" />
        }
    </div>
}