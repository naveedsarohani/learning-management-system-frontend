import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import assessmentapi from "../../uitils/api/assessment";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { formatDate } from "../../uitils/functions/global";

export default function ShowAssessment() {
  const { assessmentId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [assessment, setAssessment] = useState(blueprint.assessment);

  useEffect(() => {
    assessmentapi.show(assessmentId, token, setAssessment, handler);
  }, [assessmentId]);

  return (
    <DashboardPageCompement title={"specified assessment"}>
      <Link to={'./add-assessment'}>Add a new assessment</Link>

      <div>
        <h1>{assessment.title}</h1>
        <p>{assessment.type}</p>
        <p>{assessment.time_limit}</p>
        <p>{assessment.retakes_allowed}</p>
        <p>{formatDate(assessment.updated_at)}</p>
      </div>
    </DashboardPageCompement>
  );
}
