
import { ChildInfo, UserInfo, UserInfoExtended } from "@/data/interfacesUser";
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

export const getUserByEmail = async(email: string) => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.get(`http://localhost:8090/api/admin/user/${email}`,  {
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
};

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

export const deleteUser = async(email: string) => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const correct_email = email.replace("%40", "@");
        const response = await axios.post(`http://localhost:8090/api/admin/user/delete/${correct_email}`, {}, {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
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

export const modifyUser = async(userInfo: UserInfoExtended, email: String) => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        userInfo.photo = userInfo.photo.replace("data:image/jpeg;base64,", "");

        const response = await axios.post(`http://localhost:8090/api/admin/user/modify/${email}`, userInfo, {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        console.log(response.data);

        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            alert(error.response.data.message || "Błąd podczas próby modyfikacji");
        } else {
            console.error("Unknown error:", error);
            alert("Wystąpił nieznany błąd.");
        }
        return false;
    }  
}
