"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { deleteUser } from "@/connection/adminAPI";

const Page = () => {
    const { id } = useParams();

    useEffect (() => {
        const handleDeleteUser = async () => {
            if (!id) {
                return;
            }

            if (typeof id === 'string') {
                deleteUser(id);
            }

            //window.location.href = `/admin/main/users`;
        }


        handleDeleteUser();
    }, []);
    return (
        <div className="flex flex-row justify-center text-xl"> Deleting. . . </div>
    );
}

export default Page;