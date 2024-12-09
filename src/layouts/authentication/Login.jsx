import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import auth from "../../uitils/api/auth";
import { isLoading } from "../../uitils/functions/global";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";

export default function Login() {
    const { handler } = useHandler();
    const { user, credentials } = useAuth();

    function handleSubmit(creds) {
        auth.login(creds, handler, user);
    }

    return !credentials.user.name && <div>
        <h1>Login</h1>
        <h5>Login with your credentials</h5>

        <Form {...{ handleSubmit }}>
            <InputField
                name={'email'}
                placeholder={'enter your email address'}
            />

            <InputField
                type={'password'}
                name={'password'}
                placeholder={'enter your password'}
            />

            <SubmitButton name={isLoading(handler, 'Login')} />
        </Form>
    </div>
}