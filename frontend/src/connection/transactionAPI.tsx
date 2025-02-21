import { Transaction, UserTransaction } from "@/data/interfacesUser";
import { getToken } from "@/data/tokenHandler";
import axios from "axios";

export const getAllPossibleTransactions = async (): Promise<Transaction[]> => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return [];
        }
        const response = await axios.get('http://localhost:8090/api/transaction/get/all', {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

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

export const createTransaction = async (transactionSessionId: string, amount: number, subjectSessionId: string, text: string): Promise<boolean> => {
    const token = getToken();
    if (!token) {
        alert("You are not logged.");
        return false;
    }

    try {
        const response = await axios.post('http://localhost:8090/api/transaction/create', 
            {   tSessionId: transactionSessionId ,
                amountToPay: amount,
                sSessionId: subjectSessionId,
                describe: text}, 
            {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });


        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
    catch(error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error response:", error.response);
        } else {
            console.log("Unknown error:", error);
        }
        return false;
    }
};

export const getMyTransactions = async (): Promise<UserTransaction[]> => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return [];
        }
        const response = await axios.get('http://localhost:8090/api/transaction/get/all/user/transactions', {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

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
