
import { ChildInfo, UserInfo } from "@/data/interfacesUser";
import { getToken } from "@/data/tokenHandler";
import axios from "axios";


export const getAllChildrensData = async() => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.get('http://localhost:8090/api/admin/children/all',  {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        response.data.forEach((user: ChildInfo) => {
            user.photo = `data:image/jpeg;base64,${user.photo}`;
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            alert("Server responde: " + error.response.data.message);
        } else {
            alert("An unknown error occurred.");
        }
    }
}

export const getAllUserData = async() => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.get('http://localhost:8090/api/admin/users/all',  {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        response.data.forEach((user: UserInfo) => {
                    //child.birthDate = new Date(child.birthDate);
                    user.photo = `data:image/jpeg;base64,${user.photo}`;
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            alert("Server responde: " + error.response.data.message);
        } else {
            alert("An unknown error occurred.");
        }
    }
}
