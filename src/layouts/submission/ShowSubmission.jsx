import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { formatDate } from "../../uitils/functions/global";
import submissionapi from "../../uitils/api/submission";

export default function ShowSubmission() {
  const { submissionId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [submission, setsubmission] = useState(blueprint.submission);

  useEffect(() => {
    submissionapi.show(submissionId, token, setsubmission, handler);
  }, [submissionId]);

  return (
    <DashboardPageCompement title={"specified submission"}>
      {/* <Link to={'./add-submission'}>Add a new submission</Link> */}

      <div>
        <h1>Student: {submission.student.name}</h1>
        <h1>Assessment: {submission.assessment.title}</h1>
        <p>Score: {submission.score}</p>
        <p>Total Retakes: {submission.retake_count}</p>
        <p>{formatDate(submission.submitted_at)}</p>
      </div>
    </DashboardPageCompement>
  );
}
