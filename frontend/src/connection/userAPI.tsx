import {NewUserRegister, UserInfo } from "@/data/interfacesUser";
import axios from "axios";
import { getToken, saveToken } from "@/data/tokenHandler";

export const addNewUser = async(user: NewUserRegister) => {
    try {
        const response = await axios.post<String>('http://localhost:8090/api/register/user', user);

        if(response.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        alert("Some bigger error occured - contact with admin!");
        return false;
    }
}

export const loginUser = async(email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8090/api/authenticate', {
            email,
            password
        },{
            withCredentials: true, // Include credentials (cookies, etc.)
        });
        const token = response.data.token;

        if (token) {
            saveToken(token);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error response:", error.response);
            alert(error.response.data.message || "Błąd logowania");
        } else {
            console.error("Unknown error:", error);
            alert("Wystąpił nieznany błąd.");
        }
        return false;
    }
}

export const getUserData = async() => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.get('http://localhost:8090/api/user',  {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        response.data.photo = `data:image/jpeg;base64,${response.data.photo}`;
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            alert("Server responde: " + error.response.data.message);
        } else {
            alert("An unknown error occurred.");
        }
    }
}

