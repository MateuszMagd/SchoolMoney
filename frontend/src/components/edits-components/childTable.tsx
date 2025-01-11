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
        window.location.href = `/admin/edit/delete/user/${sessionId}`;
    }

    const handleModify = (sessionId: string) => {
        window.location.href = `/admin/edit/modify/user/${sessionId}`;
    }

    const handleShowParent = (sessionId: string) => {
        window.location.href = `/admin/edit/show/parent/${sessionId}`;
    }

    return (
        <div>
            <div className="container mx-auto">
                <table className="table-auto w-full space-x-5">
                    <thead>
                        <tr>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Pesel</th>
                            <th>Urodziny</th>
                            <th>Zdjecie</th>
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
                                    className="flex justify-center w-full p-2 bg-green-500 text-white"
                                    href="/admin/create/user"
                                >
                                    Add New Child
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