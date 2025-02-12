'use client';

import { getAllKidsFromClass } from "@/connection/classAPI";
import { ChildInfo } from "@/data/interfacesUser";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ManageClassPage = () => {
    const [children, setChildren] = useState<ChildInfo[]>([]);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => { 
        const fetchClass = async () => {
            if (id && typeof id === "string") {
                const data = await getAllKidsFromClass(id);
                setChildren(data);
            } else {
                alert("Invalid id");
            }
        }

        fetchClass();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1>Manage Class</h1>
            <table>
                <thead>
                    <tr className="flex flex-row space-x-4">
                        <td>Imie</td>
                        <td>Nazwisko</td>
                        <td>pesel</td>
                    </tr>
                </thead>
                <tbody>
                    {children.map((child) => (
                        <tr key={child.sessionId}>
                            <td>{child.firstName}</td>
                            <td>{child.lastName}</td>
                            <td>{child.pesel}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageClassPage;