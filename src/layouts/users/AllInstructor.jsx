import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import Table from "../../components/global/Table";
import blueprint from "../../uitils/blueprint";
import auth from "../../uitils/api/auth";
import { useAuth } from "../../contexts/Authentication";
import { capEach, formatDate, isNullOrEmpty, readFile } from "../../uitils/functions/global";
import ActionButton from "../../components/global/ActionButton";
import { useDelete } from "../../contexts/Delete";

export default function AllInstructor() {
    const { credentials: { token } } = useAuth();
    const [instructors, setInstructors] = useState([blueprint.user]);
    const { destroy } = useDelete();

    useEffect(() => {
        auth.users(token, setInstructors, { role: 'instructor' });
    }, []);

    console.log(instructors);
    return <DashboardPageCompement title={'all instructors'}>
        <Table
            ths={<>
                <td>Sno.</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Display Picture</td>
                <td>Registered At</td>
                <td>Actions</td>
            </>}

            tds={!isNullOrEmpty(instructors) && instructors.map((instructor, index) => <tr key={instructor.id}>
                <td>{index + 1}</td>
                <td>{instructor.name}</td>
                <td>{instructor.email}</td>
                <td>{instructor.role}</td>
                <td>
                    <img src={readFile(instructor.image)} alt="display picture" width={50} />
                </td>
                <td>{formatDate(instructor.created_at)}</td>
                <td>
                    <ActionButton
                        name={'Delete'}
                        onClick={() => destroy('/auth/delete', instructor.id, instructor.name + ' ' + instructor.role)}
                    />
                </td>
            </tr>)}
        />
    </DashboardPageCompement>
}