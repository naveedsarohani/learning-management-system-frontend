import DashboardPageCompement from "../../components/global/DashboardPage";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import course from "../../uitils/api/course";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { isLoading } from "../../uitils/functions/global";
import TextArea from "../../components/form/TextArea";

export default function AddCourse() {
    const { credentials: { token, user } } = useAuth();
    const { handler } = useHandler();

    function handleSubmit(data) {
        course.store(token, data, handler);
    }

    return (
        <DashboardPageCompement title={"add course"}>
            <h1>Add a new course</h1>

            <Form {...{ handleSubmit }}>
                <InputField type={"text"}
                    name={"title"}
                    placeholder={"Course title"} />

                <TextArea
                    type={"text"}
                    name={"description"}
                    placeholder={"Course description..."}
                />

                <InputField
                    type={"file"}
                    name={"image"}
                    accept={".jpg,.jpeg.png"}
                />

                <InputField
                    type={"hidden"}
                    name={"user_id"}
                    value={user.id}
                />

                <SubmitButton name={isLoading(handler, "Add Course")} />
            </Form>
        </DashboardPageCompement>
    )
};