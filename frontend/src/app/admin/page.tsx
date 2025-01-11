"use client"

import { useEffect } from "react";
import { checkTypeOfUser, getToken, isLogged } from "@/data/tokenHandler";
import { useRouter } from 'next/navigation';
import { UserType } from "@/data/enums";

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        if (!isLogged()) {
            alert("You are not logged.");
            router.push(`/`);
            return
        }

        const userType = checkTypeOfUser()
        if(userType == undefined) {
            alert("You are not an admin.");
            router.push(`/`);
            return
        }
        if(userType != UserType.ADMIN) {
            alert("You are not an admin.");
            router.push(`/`);
            return
        }

        alert("You are an admin.");
        router.push(`/admin/main`);
    }, []);

    return (
        <div className="flex flex-row justify-center text-xl"> Checking . . . </div>
    );
};

export default Page;