export interface AuthServiceProps {
    login: (username: string, password: string) => any;
    isLoggedIn: boolean;
    logout: () => int;
    refreshAccessToken: () => Promise<void>;
    register: (username: string, password: string) => Promise<any>;
}