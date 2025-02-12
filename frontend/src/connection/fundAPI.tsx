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
        
        const response = await axios.post('http://localhost:8090/api/fund/add/new', fundData, {
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