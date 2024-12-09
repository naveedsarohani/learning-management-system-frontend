import { createContext, useContext, useState } from "react"

const Authentication = createContext();

// conext hook
export default function AuthenticationProvider({ children }) {

    // state to hold credentials
    const [credentials, setCredentials] = useState(() => {
        // default values
        const storedCredentials = localStorage.getItem('user_credentials');
        return storedCredentials ? JSON.parse(storedCredentials) : { user: false, token: false };
    });

    // function to store login credentials and auth token
    function save(user, token) {
        const userCredentials = { user, token }
        localStorage.setItem('user_credentials', JSON.stringify(userCredentials));
        setCredentials(userCredentials);
    }

    // function to revoke login credentials and auth token
    function revoke() {
        localStorage.removeItem('user_credentials');
        setCredentials({ user: false, token: false });
    }

    // return statement
    return <Authentication.Provider value={{ user: { save, revoke }, credentials }}>
        {children}
    </Authentication.Provider>
}

// context proviver the custome hook
export function useAuth() {
    return useContext(Authentication);
}