import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import blueprint from "../../uitils/blueprint";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import { useParams } from "react-router-dom";
import { useHandler } from "../../contexts/Handler";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { isLoading } from "../../uitils/functions/global";
import assessmentapi from "../../uitils/api/assessment";
import SelectField from "../../components/form/SelectField";

export default function EditAssessment() {
  const [assessment, setAssessment] = useState(blueprint.assessment);
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const { assessmentId } = useParams();

  function handleSubmit(data) {
    assessmentapi.update(assessmentId, data, token, handler);
  }

  useEffect(() => {
    assessmentapi.show(assessmentId, token, setAssessment, handler);
  }, []);

  return assessment.id && <DashboardPageCompement title={"edit assessment"}>
    <h1>This is edit assessment page</h1>

    <Form {...{ handleSubmit }}>
      <InputField
        name={"title"}
        value={assessment.title}
        set={setAssessment}
      />

      <SelectField
        name={'type'}
        selected={assessment.type}
        set={setAssessment}
        data={['quiz', 'test', 'exam']}
      />

      <InputField
        type={'number'}
        name={"time_limit"}
        value={assessment.time_limit}
        set={setAssessment}
      />

      <InputField
        type={'number'}
        name={"retakes_allowed"}
        value={assessment.retakes_allowed}
        set={setAssessment}
      />

      <SubmitButton name={isLoading(handler, "Edit assessment")} />
    </Form>
  </DashboardPageCompement>
}
