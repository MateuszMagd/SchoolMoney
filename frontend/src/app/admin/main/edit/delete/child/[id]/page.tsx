'use client'

import { deleteChild } from "@/connection/childAPI";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    
    useEffect (() => {
        const handleDeleteUser = async () => {
            if (!id) {
                return;
            }
    
            if (typeof id === 'string') {
                const result = await deleteChild(id);
                if (result) {
                    alert("User deleted.");
                    router.push("/admin/main/children");
                }
            } else {
                alert("Something went wrong during deleteing user.");
            }
        }
    
    
        handleDeleteUser();
    }, []);
    return (
        <div className="flex flex-row justify-center text-xl"> Checking . . . </div>
    );
}

export default Page;