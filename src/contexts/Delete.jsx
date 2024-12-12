import { createContext, useContext, useState } from "react";

const DeleteContext = createContext();

export default function DeleteContextProvider({ children }) {
    const { deleteCreds, setDeleteCreds } = useState({
        isBeingDeleted: false,
        route: '',
        id: '',
        identity: ''
    });

    function destory(route, id, identity) {
        setDeleteCreds(pre => {
            return { ...pre, route, id, identity };
        })
    }

    function setIsDeleting(deletion) {
        setDeleteCreds.isBeingDeleted(deletion);
    }

    return <DeleteContext.Provider value={{ deletion: deleteCreds, destory, setIsDeleting }}>
        {children}
    </DeleteContext.Provider>
}

export function useDelete() {
    return useContext(DeleteContext);
}