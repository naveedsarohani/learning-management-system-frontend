import { createContext, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

const Handler = createContext();

// conext hook
export default function HandlerProvider({ children }) {
    // state
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // return statement
    return <Handler.Provider value={{ handler: { loading, setLoading, validationErrors, setValidationErrors, navigate, location } }}>
        {children}
    </Handler.Provider>
}

// context proviver the custome hook
export function useHandler() {
    return useContext(Handler);
}