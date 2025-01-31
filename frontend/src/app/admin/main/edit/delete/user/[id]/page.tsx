"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { deleteUser } from "@/connection/adminAPI";

const Page = () => {
    const router = useRouter();
    const { id } = useParams();

    useEffect (() => {
        const handleDeleteUser = async () => {
            if (!id) {
                return;
            }

            if (typeof id === 'string') {
                await deleteUser(id);
                alert("User deleted.");
                router.push("/admin/main/users");
            } else {
                alert("Something went wrong during deleteing user.");
            }
        }


        handleDeleteUser();
    }, []);
    return (
        <div className="flex flex-row justify-center text-xl"> Deleting. . . </div>
    );
}

export default Page;