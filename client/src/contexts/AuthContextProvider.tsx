import { ReactNode, createContext, useContext, useState } from "react";

type AuthStateType = {
    username: string
    id: string
    max_score: number
    isAuthenticated: true
} | {
    username: null
    id: null
    max_score: null
    isAuthenticated: false
}

type AuthContextProviderValueType = {
    authState: AuthStateType,
    setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>
}

const authContext = createContext<AuthContextProviderValueType>({} as AuthContextProviderValueType);

function AuthContextProvider({ children }: { children: any }) {
    const [authState, setAuthState] = useState<AuthStateType>({
        id: null,
        username: null,
        max_score: null,
        isAuthenticated: false
    });

    return <authContext.Provider value={{
        authState,
        setAuthState
    }}>
        {children}
    </authContext.Provider>
}

export function useAuthContext() {
    return useContext(authContext);
}

export default AuthContextProvider;