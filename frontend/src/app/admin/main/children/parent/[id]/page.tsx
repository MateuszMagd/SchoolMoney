"use client"
import { assignParentToChild, getParentByChildSessionId} from "@/connection/adminAPI";
import { UserInfo } from "@/data/interfacesUser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ShowAddParentPage = () => { 
    const { id } = useParams();
    const [parents, setParents] = useState<UserInfo[]>([]);
    const [isThereParents, setIsThereParents] = useState<boolean>(false);
    const [hasControlParent, setHasControlParent] = useState<boolean>(false);
    const [selectedParent, setSelectedParent] = useState<string>("");

    useEffect(() => {
        const fetchParents = async () => {
            if (id && typeof id === "string") {
                const data: UserInfo[] = await getParentByChildSessionId(id); 
                setParents(data);
                setIsThereParents(data.length > 0);
                setHasControlParent(data.some((parent) => parent.firstName === "CONTROL" && parent.lastName === "CONTROL"));
                console.log(data);
                console.log(isThereParents);
                console.log(hasControlParent);
            }
        };

        fetchParents();
    }, []);

    const handleAssignParent = async () => {
        if (!selectedParent) {
            alert("Wybierz rodzica przed przypisaniem!");
            return;
        }

        try {
            const success = await assignParentToChild(id as string, selectedParent);
            if (success) {
                alert("Rodzic został przypisany!");
                location.reload(); // Odświeżenie strony po przypisaniu
            } else {
                alert("Błąd przy przypisywaniu rodzica.");
            }
        } catch (error) {
            console.error("Błąd przypisywania rodzica:", error);
            alert("Wystąpił błąd.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-10 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Zarządzanie rodzicami</h1>

            {isThereParents ? (
                hasControlParent ? (
                    <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
                        <h2 className="text-xl font-semibold mb-4 text-red-500">Rodzic kontrolny wykryty! Przypisz nowego rodzica:</h2>
                        <select 
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            onChange={(e) => setSelectedParent(e.target.value)}
                        >
                            <option value="">Wybierz rodzica</option>
                            {parents
                                .filter((parent) => parent.firstName !== "CONTROL" || parent.lastName !== "CONTROL")
                                .map((parent) => (
                                    <option key={parent.email} value={parent.email}>
                                        {parent.firstName} {parent.lastName}
                                    </option>
                                ))}
                        </select>
                        <button 
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={handleAssignParent}
                        >
                            Przypisz rodzica
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md w-[500px]">
                        <h2 className="text-xl font-semibold mb-4">Lista rodziców</h2>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Imię</th>
                                    <th className="border border-gray-300 p-2">Nazwisko</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parents.map((parent) => (
                                    <tr key={parent.pesel} className="text-center">
                                        <td className="border border-gray-300 p-2">{parent.firstName}</td>
                                        <td className="border border-gray-300 p-2">{parent.lastName}</td>
                                        <td className="border border-gray-300 p-2">{parent.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <p className="text-gray-500">Brak rodziców do wyświetlenia.</p>
            )}
        </div>
    );
};

export default ShowAddParentPage;
