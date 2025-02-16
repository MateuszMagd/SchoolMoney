"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "@/data/tokenHandler";
import { UserInfo, UserInfoExtended } from "@/data/interfacesUser";
import { getAllUserData} from "@/connection/adminAPI";
import UserInfoRow from "./userInfoRow";

const UsersPage = () => {
    const [user, setUser] = useState<UserInfoExtended[]>([]);
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
            } catch(error) {
                console.log(error)
                setIsLoading(false);
                setError("User Data can't be fatched.");
            }
        }

        fetchUsers();
    }, []);
    if(isLoading) {
        return <div>Loading. . .</div>;
    }

    if(error) {
        return <div className="flex flex-row justify-normal min-h-screen text-red-500">{error}</div>
    }

    const handleDelete = (sessionId: string) => {
        window.location.href = `/admin/main/edit/delete/user/${sessionId}`;
    }

    const handleModify = (sessionId: string) => {
        window.location.href = `/admin/main/edit/modify/user/${sessionId}`;
    }

    return (
        <div>
           <div className="mt-20 container mx-auto bg-white rounded-[30px] shadow-2xl w-[1400px] p-6">
                <table className="table-auto w-full space-x-5 font-[Open_Sans] text-[18px] text-dark_blue">
                
                <thead className="text-[20px] font-bold">
                        <tr>
                            <th>IMIĘ</th>
                            <th>NAZWISKO</th>
                            <th>EMAIL</th>
                            <th>NUMER</th>
                            <th>TYP UŻYTKOWNIKA</th>
                            <th>ZDJĘCIE</th>
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
                                    className="mt-7 flex justify-center w-full p-2 bg-dark_blue text-white rounded-lg text-center text-[17px]"
                                    href="/admin/main/edit/add/user"
                                >
                                    Dodaj nowego użytkownika + 
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