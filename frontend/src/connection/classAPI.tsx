import { ChildClassInfo, ChildInfo, ClassInfo, ClassQueueInfo } from "@/data/interfacesUser";
import { getToken } from "@/data/tokenHandler";
import axios from "axios";

export const createNewClass = async (className: string) => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return;
        }
        const response = await axios.post('http://localhost:8090/api/class/add/new', className, {
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
        return false;
    }
}

export const getAllClassesFromUser = async(): Promise<ClassInfo[]> => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return [];
        }
        const response = await axios.get('http://localhost:8090/api/class/get/user/all', {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        const classesData: ClassInfo[] = response.data ?? [];
        if (classesData.length === 0) {
            alert("No classes found.");
        }

        return classesData;
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

export const getAllClassesFromUserAndUserKids = async(): Promise<ClassInfo[]> => {
    try {
        const token = getToken();
        if(!token) {
            alert("You are not logged.");
            return [];
        }

        const response = await axios.get('http://localhost:8090/api/class/get/all/possible', {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        const classesData: ClassInfo[] = response.data ?? [];
        if (classesData.length === 0) {
            alert("No classes found.");
        }

        return classesData;
    } catch(error) {
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

export const getAllKidsFromClass = async(sessionId: string): Promise<ChildInfo[]> => {
    try {
        const token = getToken();
        if(!token) {
            alert("You are not logged.");
            return [];
        }
        const response = await axios.get('http://localhost:8090/api/class/get/children', {
            headers: {
                'Authorization': token,
                'SessionId': sessionId,
            },
            withCredentials: true,
        });

        const childrenData: ChildInfo[] = response.data ?? [];

        return childrenData;
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

export const getClassByChild = async(childId: string): Promise<ChildClassInfo> => { 
    try {
        const token = getToken();
        if(!token) {
            alert("You are not logged.");
            return {} as ChildClassInfo;
        }
        const response = await axios.get('http://localhost:8090/api/class/get/child/class', {
            headers: {
                'Authorization': token,
                'SessionId': childId,
            },
            withCredentials: true,
        });

        const childrenData: ChildClassInfo = response.data;

        return childrenData;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error response:", error.response);
            alert(error.response.data.message || "Błąd logowania");
        } else {
            console.log("Unknown error:", error);
            alert("Wystąpił nieznany błąd.");
        }
        return {} as ChildClassInfo;
    }

}

export const getAllClasses = async(): Promise<ClassInfo[]> => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return [];
        }
        const response = await axios.get('http://localhost:8090/api/class/get/all/classes', {
            headers: {
                'Authorization': token,
            },
            withCredentials: true,
        });

        const classesData: ClassInfo[] = response.data ?? [];
        if (classesData.length === 0) {
            alert("No classes found.");
        }

        return classesData;
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

export const askForAssigmentToClass = async(classId: string, childId: string) => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return false;
        }
        const response = await axios.post('http://localhost:8090/api/class/post/ask/child',  { childSessionId: childId },  {
            headers: {
                'Authorization': token,
                'ClassSessionId': classId,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

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

export const getAllCandidatesToClass = async(classId: string): Promise<ClassQueueInfo[]> => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return [];
        }
        const response = await axios.get('http://localhost:8090/api/class/get/all/classes/queue/for/user', {
            headers: {
                'Authorization': token,
                'ClassSessionId': classId,
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

export const decideOnCandidate = async (classQueueId: string, decision: boolean) => {
    try {
        const token = getToken();
        if (!token) {
            alert("You are not logged.");
            return [];
        }

        const response = await axios.post('http://localhost:8090/api/class/post/decide/child',
            { classQueueSessionId: classQueueId, verdict: decision },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

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
};
