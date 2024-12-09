import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import auth from "../../uitils/api/auth";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";

export default function Register() {
    const { handler } = useHandler();
    const { user } = useAuth();

    function handleSubmit(creds) {
        auth.login(creds, handler, user);
    }

    return <div>
        <h1>Register</h1>
        <h5>Register yourself at us</h5>

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

            <SubmitButton name={handler.loading ? 'Loading...' : 'Login'} />
        </Form>
    </div>
}