import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import assessmentapi from "../../uitils/api/assessment";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { formatDate } from "../../uitils/functions/global";
import ActionButton from "../../components/global/ActionButton";
import question from "../../uitils/api/question";

export default function ShowAssessment() {
  const { assessmentId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [assessment, setAssessment] = useState(blueprint.assessment);
  const [questions, setQuestions] = useState([blueprint.question]);

  useEffect(() => {
    assessmentapi.show(assessmentId, token, setAssessment, handler);
    question.all(token, setQuestions, handler, { assessment_id: assessmentId });
  }, [assessmentId]);

  return (
    <DashboardPageCompement title={"specified assessment"}>
      <ActionButton name={'Add a new question'} route={'./add-assessment'} />

      <div>
        <h1>{assessment.title}</h1>
        <p>{assessment.type}</p>
        <p>{assessment.time_limit}</p>
        <p>{assessment.retakes_allowed}</p>
        <p>{formatDate(assessment.updated_at)}</p>
      </div>

      {/* all it's questions */}

    </DashboardPageCompement>
  );
}
