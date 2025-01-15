import { createContext, useContext, useState } from "react";

const DeleteContext = createContext();

export default function DeleteContextProvider({ children }) {
    const [deleteCreds, setDeleteCreds] = useState({
        isBeingDeleted: false,
        route: '',
        id: '',
        identity: '',
        set: null
    });

    const [isDeleted, setIsDeleted] = useState(false);

    function destroy(route, id, identity, set = null) {
        setDeleteCreds({ isBeingDeleted: true, route, id, identity, set })
    }

    function setIsDeleting(deletion) {
        setDeleteCreds(pre => {
            return {
                ...pre,
                isBeingDeleted: deletion,
            }
        });
    }

    return <DeleteContext.Provider value={{ deletion: { ...deleteCreds }, destroy, setIsDeleting, isDeleted, setIsDeleted }}>
        {children}
    </DeleteContext.Provider>
}

export function useDelete() {
    return useContext(DeleteContext);
}