import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import questionapi from "../../uitils/api/question";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { formatDate } from "../../uitils/functions/global";

export default function ShowQuestion() {
  const { questionId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [question, setQuestion] = useState(blueprint.question);

  useEffect(() => {
    questionapi.show(questionId, token, setQuestion, handler);
  }, [questionId]);

  return (
    <DashboardPageCompement title={"specified question"}>
      <Link to={'./add-question'}>Add a new question</Link>

      <div>
        <h1>{question.question_text}</h1>
        <p>{question.type}</p>
        <p>{formatDate(question.created_at)}</p>
      </div>
    </DashboardPageCompement>
  );
}
