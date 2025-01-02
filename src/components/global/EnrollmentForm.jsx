import { set } from "react-hook-form";
import blueprint from "../../uitils/blueprint";
import { capitalize, extractExcept, isLoading } from "../../uitils/functions/global";
import Form from "../form/Form";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";
import ActionButton from "./ActionButton";

export default function EnrollmentForm({ course = blueprint.course, userId, handler, set }) {

    const handleSubmit = (data) => {
        data = extractExcept(data, ['feedback_text']);
        console.log(data);
    }

    return <div>
        <div>
            <h1>You are enrolling for the course <strong>{capitalize(course.title)}</strong></h1>

            <Form handleSubmit={handleSubmit}>
                <InputField
                    name="feedback_text"
                    placeholder="Enter your feedback for the course enrollment"
                />

                <InputField
                    type="hidden"
                    name="user_id"
                    value={userId}
                />

                <InputField
                    type="hidden"
                    name="course_id"
                    value={course.id}
                />

                <SubmitButton name={isLoading(handler, 'Confirm Enrollmemt')} />
                <ActionButton name='Cancel' onClick={() => set(false)} />
            </Form>
        </div>
    </div>
}