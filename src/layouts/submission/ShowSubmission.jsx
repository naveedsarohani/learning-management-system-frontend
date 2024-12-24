import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { formatDate } from "../../uitils/functions/global";
import submissionapi from "../../uitils/api/submission";
import ActionButton from "../../components/global/ActionButton";
import { useDelete } from "../../contexts/Delete";

export default function ShowSubmission() {
  const { submissionId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [submission, setsubmission] = useState(blueprint.submission);
  const { destroy } = useDelete();

  useEffect(() => {
    submissionapi.show(submissionId, token, setsubmission, handler);
  }, [submissionId]);

  return (
    <DashboardPageCompement title={"specified submission"}>

      <div>
        <h1>Student: {submission.student.name}</h1>
        <h1>Assessment: {submission.assessment.title}</h1>
        <p>Score: {submission.score}</p>
        <p>Total Retakes: {submission.retake_count}</p>
        <p>Submitted on: {formatDate(submission.submitted_at)}</p>

        <ActionButton
          name={"Delete"}
          onClick={() =>
            destroy("/submissions", submission.id, "submission")
          }
          color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
        />
      </div>
    </DashboardPageCompement>
  );
}
