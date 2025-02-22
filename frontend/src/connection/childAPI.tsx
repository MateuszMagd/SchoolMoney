import axios from "axios"
import { getToken } from "@/data/tokenHandler"
import { ChildInfo } from "@/data/interfacesUser";

export const getAllChildrenForParent = async () => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.get('http://localhost:8090/api/user/children',  {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        response.data.forEach((child: ChildInfo) => {
            child.photo = `data:image/jpeg;base64,${child.photo}`;
        });

        return response.data;
    }
    catch (error) {
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

export const getChildBySessionId = async (sessionId: string) => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.get(`http://localhost:8090/api/user/child/${sessionId}`,  {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });
        response.data.photo = `data:image/jpeg;base64,${response.data.photo}`;
        return response.data;
    }
    catch (error) {
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

export const editChild = async (data: ChildInfo) => {
    try {

        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.post(`http://localhost:8090/api/user/child/edit`, data, {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        return response.data;

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

};