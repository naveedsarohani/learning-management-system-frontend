import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import questionapi from "../../uitils/api/question";
import answerapi from "../../uitils/api/answer";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { capitalize, formatDate, isNullOrEmpty } from "../../uitils/functions/global";

export function populateOptions(data) {
  return Object.entries(JSON.parse(data)).map(([key, value], index) => <li key={index}>{key}: {capitalize(value)}</li>)
}

export default function ShowQuestion() {
  const { questionId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [question, setQuestion] = useState(blueprint.question);
  const [answer, setAnswer] = useState(blueprint.answer);

  useEffect(() => {
    questionapi.show(questionId, token, setQuestion, handler);
    answerapi.all(token, setAnswer, handler, { question_id: questionId });
  }, [questionId]);

  return (
    <DashboardPageCompement title={"specified question"}>
      <div>
        <h1>Assessment: {capitalize(question.assessment.title)}</h1>
      </div>

      <div>
        <h1>{capitalize(question.question_text)}</h1>
        <p>Type: {question.type}</p>
        <p>Created on: {formatDate(question.created_at)}</p>
      </div>

      <div>
        <h1>Options</h1>
        {!isNullOrEmpty(answer) && answer.question.type == 'MCQ' && <ol>
          {populateOptions(answer.answer_text)}
          <li>The correct option is: {answer.is_correct}</li>
        </ol>}

        {!isNullOrEmpty(answer) && answer.question.type == 'true/false' && <ol>
          <li>This is true or false optionary question</li>
          <li>The correct option is: {answer.is_correct}</li>
        </ol>}

      </div>
    </DashboardPageCompement>
  );
}
