import { FundInfo } from "@/data/interfacesUser";
import { getToken } from "@/data/tokenHandler";
import axios from "axios";

export const createNewFund = async (fundData: FundInfo): Promise<boolean> => {
    try {
        const token = getToken();
        if(!token) {
            alert("You are not logged.");
            return false;
        }
        
        const response = await axios.post('http://localhost:8090/api/funds/new', fundData, {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });


        if(response.status !== 200) {
            alert("Failed to create new fund.");
            return false;
        }

        return true;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error response:", error.response);
            alert(error.response.data.message || "Błąd logowania");
        } else {
            console.log("Unknown error:", error);
            alert("Wystąpił nieznany błąd.");
        }
        return false;
    }
}

export const getAllMyFunds = async () => {
    try {
        const token = getToken();
        if(!token) {
            alert("You are not logged.");
            return [];
        }

        const response = await axios.get('http://localhost:8090/api/funds/get/my-funds', {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        if(response.status !== 200) {
            alert("Failed to fetch funds.");
            return [];
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error response:", error.response);
            alert(error.response.data.message || "Błąd logowania");
        } else {
            console.log("Unknown error:", error);
            alert("Wystąpił nieznany błąd.");
        }
        return [];
    }
}


export const getBetterAllMyFunds = async () => {
    try {
        const token = getToken();
        if(!token) {
            alert("You are not logged.");
            return [];
        }

        const response = await axios.get('http://localhost:8090/api/funds/get/all/my/funds', {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        if(response.status !== 200) {
            alert("Failed to fetch funds.");
            return [];
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error response:", error.response);
            alert(error.response.data.message || "Błąd logowania");
        } else {
            console.log("Unknown error:", error);
            alert("Wystąpił nieznany błąd.");
        }
        return [];
    }
}

export const getFundBySessionId = async (sessionId: string) => {
    const token = getToken();
    if(!token) {
        alert("You are not logged.");
        return null;
    }

    try {
        const response = await axios.get(`http://localhost:8090/api/funds/get/${sessionId}`, {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        if(response.status !== 200) {
            alert("Failed to fetch fund.");
            return null;
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error response:", error.response);
            alert(error.response.data.message || "Błąd logowania");
        } else {
            console.log("Unknown error:", error);
            alert("Wystąpił nieznany błąd.");
        }
        return null;
    }
}
