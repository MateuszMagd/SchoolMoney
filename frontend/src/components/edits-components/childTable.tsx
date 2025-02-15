"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "@/data/tokenHandler";
import { ChildInfo} from "@/data/interfacesUser";
import { getAllChildrensData } from "@/connection/adminAPI";
import ChildInfoRow from "./childInfoRow";

const ChildrenPage = () => {
    const [user, setUser] = useState<ChildInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = getToken();
        if(!token) {
            throw new Error('Token not found');
        }
        const fetchUsers = async() => {
            try {
                const data = await getAllChildrensData();
                setIsLoading(false);
                setUser(data);
                console.log(user)
            } catch(error) {
                console.log(error)
                setIsLoading(false);
                setError("User Data can't be fatched.");
            }
        }

        fetchUsers();
    }, [])

    if(isLoading) {
        return <div>Loading. . .</div>;
    }

    if(error) {
        return <div className="flex flex-row justify-normal min-h-screen text-red-500">{error}</div>
    }

    const handleDelete = (sessionId: string) => {
        window.location.href = `/admin/main/edit/delete/child/${sessionId}`;
    }

    const handleModify = (sessionId: string) => {
        window.location.href = `/admin/main/edit/modify/child/${sessionId}`;
    }

    const handleShowParent = (sessionId: string) => {
        window.location.href = `/admin/main/edit/show/parent/${sessionId}`;
    }

    return (
        <div>
            <div className="mt-20 container mx-auto bg-white rounded-[30px] shadow-2xl w-[1200px] p-6">
                <table className="table-auto w-full space-x-5 font-[Open_Sans] text-[18px] text-dark_blue">
                    <thead className="text-[20px] font-bold">
                        <tr>
                            <th>IMIĘ</th>
                            <th>NAZWISKO</th>
                            <th>PESEL</th>
                            <th>URODZINY</th>
                            <th>ZDJĘCIE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((child, index) => (
                            <ChildInfoRow 
                                key={index} 
                                child={child} 
                                onDelete={() => handleDelete(child.sessionId)}
                                onModify={() => handleModify(child.sessionId)}
                                showParent={() => handleShowParent(child.sessionId)}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="mt-10">
                            <td colSpan={8}>
                                <Link
                                    className="mt-7 flex justify-center w-full p-2 bg-dark_blue text-white rounded-lg font-bold text-center text-[17px]"
                                    href="/admin/main/edit/add/child"
                                >
                                    DODAJ NOWE DZIECKO +
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default ChildrenPage;