import { createContext, useContext, useState } from "react";

const DeleteContext = createContext();

export default function DeleteContextProvider({ children }) {
    const [deleteCreds, setDeleteCreds] = useState({
        isBeingDeleted: false,
        route: '',
        id: '',
        identity: ''
    });

    function destroy(route, id, identity) {
        setDeleteCreds({ isBeingDeleted: true, route, id, identity })
    }

    function setIsDeleting(deletion) {
        setDeleteCreds(pre => {
            return {
                ...pre,
                isBeingDeleted: deletion,
            }
        });
    }

    return <DeleteContext.Provider value={{ deletion: { ...deleteCreds }, destroy, setIsDeleting }}>
        {children}
    </DeleteContext.Provider>
}

export function useDelete() {
    return useContext(DeleteContext);
}