import { useState } from "react";
import ActionButton from "../../components/global/ActionButton";
import { capEach, handleImagePreview, isNullOrEmpty, readFile } from "../../uitils/functions/global";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import UpdateImagePreview from "../../components/global/UpdateImagePreview";
import UpdatePassword from "./UpdatePassword";
import auth from "../../uitils/api/auth";
import { useHandler } from "../../contexts/Handler";

export default function ProfilePage() {
    const { credentials, user } = useAuth();
    const [helper, setHelper] = useState({ name: false, image: false, isPassUpdate: false });
    const [authUser, setAuthUser] = useState(credentials.user)
    const { handler } = useHandler();

    function handleSubmit(data) {
        if (Object.keys(data)[0] == 'image') {
            if (isNullOrEmpty(data.image.name)) {
                data.image = '';
            }
        }
        auth.update(data, credentials.token, handler, {
            setHelper, user, token: credentials.token,
            target: [Object.keys(data)[0]]
        });
    }

    return <div>
        <div>
            {!helper.name && <div>
                <h1>{capEach(authUser.name)}</h1>
                <ActionButton name={'Edit'} onClick={() => setHelper({ ...helper, name: true, })} />
            </div>}

            {helper.name && <div>
                <Form handleSubmit={handleSubmit}>
                    <InputField
                        name={'name'}
                        value={authUser.name}
                        set={setAuthUser}
                    />

                    <SubmitButton name={'save changes'} />
                    <ActionButton name={'cancel'} onClick={() => setHelper({ ...helper, name: false, })} />
                </Form>
            </div>}


            <UpdateImagePreview
                currentImage={authUser.image}
                classes={'w-20'}
            />

            {helper.image ? <div>
                <Form handleSubmit={handleSubmit}>
                    <InputField
                        type={'file'}
                        name={'image'}
                        accept={'.jpb,.png,.jpeg'}
                        customeFunc={handleImagePreview}
                    />

                    <SubmitButton name={'upload picture'} />
                    <ActionButton name={'cancel'} onClick={() => setHelper({ ...helper, image: false, })} />
                </Form>
            </div> :
                <ActionButton name={'update profile picture'} onClick={() => setHelper({ ...helper, image: true, })} />}
        </div>

        <div>
            <p>Email: {authUser.email}</p>
            <p>Role: {authUser.role}</p>
        </div>

        <div>
            {helper.isPassUpdate ? <div>
                <UpdatePassword setHelper={setHelper} />
            </div> : <p>
                <ActionButton
                    name={'Update Password'}
                    onClick={() => setHelper({ ...helper, isPassUpdate: true, })}
                />
            </p>}
        </div>
    </div>
}