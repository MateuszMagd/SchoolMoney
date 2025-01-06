"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "@/data/tokenHandler";
import { UserInfo } from "@/data/interfacesUser";
import { getAllUserData} from "@/connection/adminAPI";
import UserInfoRow from "./userInfoRow";

const UsersPage = () => {
    const [user, setUser] = useState<UserInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = getToken();
        if(!token) {
            throw new Error('Token not found');
        }
        const fetchUsers = async() => {
            try {
                const data = await getAllUserData();
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

    const handleDelete = (email: string) => {
        window.location.href = `/admin/delete/user/${email}`;
    }

    const handleModify = (email: string) => {
        window.location.href = `/admin/modify/user/${email}`;
    }

    return (
        <div>
            <div className="container mx-auto">
                <table className="table-auto w-full space-x-5">
                    <thead>
                        <tr>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Typ użytkownika</th>
                            <th>Zdjecie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <UserInfoRow 
                                key={index} 
                                user={user} 
                                onDelete={() => handleDelete(user.email)}
                                onModify={() => handleModify(user.email)}
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
                                    Add New User
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default UsersPage;