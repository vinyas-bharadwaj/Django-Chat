import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";


export function useAuthService(): AuthServiceProps {
    const getUserDetails = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("accessToken")
            const response = await axios.get(
                `http://127.0.0.1/api/account/?user_id=${userId}`, {
                    headers: {
                        Authorization: `bearer ${accessToken}`
                    }
                });
            const userDetails = response.data;
            localStorage.setItem("username", userDetails.username);
        } catch (error) {
            return error;
        }
    }



    const getUserIdFromToken = (token: string) => {
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payloadData = JSON.parse(decodedPayload);
        const userId = payloadData.user_id;

        return userId;
    }


    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/", {
                    username, 
                    password,
                }
            );
            const {access, refresh} = response.data;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("userId", getUserIdFromToken(access));

            getUserDetails();

        } catch(error: any) {
            return error;
        }
    } 
    return { login }
}
