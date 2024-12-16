import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import answerapi from "../../uitils/api/answer";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { formatDate } from "../../uitils/functions/global";

export default function ShowAnswer() {
  const { answerId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [answer, setAnswer] = useState(blueprint.answer);

  useEffect(() => {
    answerapi.show(answerId, token, setAnswer, handler);
  }, [answerId]);

  return (
    <DashboardPageCompement title={"specified answer"}>
      <Link to={'./add-answer'}>Add a new answer</Link>

      <div>
        <h1>{answer.answer_text}</h1>
        <p>{answer.type}</p>
        <p>{formatDate(answer.created_at)}</p>
      </div>
    </DashboardPageCompement>
  );
}
