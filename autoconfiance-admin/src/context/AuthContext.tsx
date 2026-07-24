import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedSession = localStorage.getItem('admin_session');
        if (savedSession === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (password: string) => {
        // Ideally this should be a server verification, but for this setup:
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        if (password === adminPassword) {
            localStorage.setItem('admin_session', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('admin_session');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
