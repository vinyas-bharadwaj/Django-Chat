import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { useState } from "react";

export function useAuthService(): AuthServiceProps {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== null) {
        return Boolean(loggedIn);
    } else {
        return false;
    }
  });

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://127.0.0.1/api/account/?user_id=${userId}`,
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );
      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } catch (error: any) {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        return error;
    }
  };

  const getUserIdFromToken = (token: string) => {
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const payloadData = JSON.parse(decodedPayload);
    const userId = payloadData.user_id;

    return userId;
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userId", getUserIdFromToken(access));
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);

      getUserDetails();
    } catch (error: any) {
      return error;
    }
  };
  return { login, isLoggedIn };
}
