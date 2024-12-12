import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import auth from "../../uitils/api/auth";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import { isLoading } from "../../uitils/functions/global";

export default function UpdatePassword() {
    const { handler } = useHandler();
    const { credentials: { token } } = useAuth();

    function handleSubmit(creds) {
        auth.updatePassword(creds, token, handler);
    }

    return <div>
        <h1>Update Password</h1>
        <h5>Using your old password you can update your password</h5>

        <Form {...{ handleSubmit, }}>
            <InputField
                type={'password'}
                name={'old_password'}
                placeholder={'enter your old passowrd'}
            />

            <InputField
                type={'password'}
                name={'password'}
                placeholder={'create a new password'}
            />

            <InputField
                type={'password'}
                name={'password_confirmation'}
                placeholder={'confirm your new password'}
            />

            <SubmitButton name={isLoading(handler, "Update Now")} />
        </Form>
    </div>
}