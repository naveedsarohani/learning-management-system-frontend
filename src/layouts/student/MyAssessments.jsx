import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler";
import assessment from "../../uitils/api/assessment";
import blueprint from "../../uitils/blueprint";
import AssessmentCard from "../../components/global/AssessmentCard";
import { isNullOrEmpty } from "../../uitils/functions/global";
import NoContent from "../../components/global/NoContent";

export default function MyAssessments() {
    const { credentials: { user, token } } = useAuth();
    const [assessments, setAssessments] = useState([blueprint.assessment]);
    const { handler } = useHandler();

    useEffect(() => {
        assessment.all(token, setAssessments, handler);
    }, [location.pathname, user]);

    return <div>
        <h1>All Assessments</h1>
        {!isNullOrEmpty(assessments[0].id)
            ? assessments.map(assessment => <AssessmentCard assessment={assessment} />)
            : <NoContent message="there is not any course assessment for you" />
        }
    </div>
}