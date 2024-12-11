import { useHandler } from "../../contexts/Handler";
import { useAuth } from "../../contexts/Authentication";
import auth from "../../uitils/api/auth";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import SelectField from "../../components/form/SelectField";
import { role } from "../../uitils/functions/constants";
import { isLoading } from "../../uitils/functions/global";

export default function Register() {
    const { handler } = useHandler();
    const { user } = useAuth();

    function handleSubmit(creds) {
        auth.register(creds, handler, user);
    }

    return <div>
        <h1>Register</h1>
        <h5>Register yourself at us</h5>

        <Form {...{ handleSubmit }}>
            <InputField
                name={'name'}
                placeholder={'enter your name'}
            />

            <InputField
                name={'email'}
                placeholder={'enter your email address'}
            />

            <SelectField
                name={'role'}
                data={[role.INSTRUCTOR, role.STUDENT]}
            />

            <InputField
                type={'password'}
                name={'password'}
                placeholder={'enter your password'}
            />

            <InputField
                type={'password'}
                name={'password_confirmation'}
                placeholder={'confirma your password'}
            />

            <InputField
                type={'file'}
                name={'image'}
                accept={'.jpg,jpeg,.png'}
            />

            <SubmitButton name={isLoading(handler, "Finish Registration")} />
        </Form>
    </div>
}