import { createContext, ReactNode } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}
interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    async function signIn() {
        console.log("teste");
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: "Pedro Luiz",
                avatarUrl: "https://github.com/PedroLuizAP.png"
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}