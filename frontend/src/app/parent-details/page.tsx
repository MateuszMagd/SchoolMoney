// Page-Parent.tsx
"use client";

import ParentCard from "@/components/parentCard";
import ChildCard from "@/components/childCard";
import RouterButton from "@/components/routerButton";
import { isLogged } from "@/data/tokenHandler";
import { useEffect, useState } from "react";
import { getUserData } from "@/connection/userAPI";
import { UserInfo, ChildInfo } from "@/data/interfacesUser";
import { getAllChildrenForParent } from "@/connection/childAPI";

function test(boolean_val: boolean) {
    alert(boolean_val);
  }

const Page = () => { 
    const [logged, setLogged] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserInfo | null>(null);
    const [childData, setChildData] = useState<ChildInfo[]>([]);

    useEffect(() => {
        setLogged(isLogged());

        const getData = async () => {
            if(logged === true){
                // Set user data
                const data = await getUserData();
                setUserData(data);
                
                // Set child data
                const childData = await getAllChildrenForParent();
                setChildData(childData);
                console.log(childData)
            } 
        }

        getData();
    }, [logged]);

    if(logged === false){
        return (
            <div>
                <div className="flex flex-col justify-center items-center space-y-6 p-10">
                    <div> You are not logged! Please go back to main page and login!</div>
                    <RouterButton page="/" buttonString = "Wroc do głownej"/>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="flex flex-col justify-center items-center space-y-6 p-10">
                { userData !== null ?
                    <ParentCard info = {userData}/> :
                    <div> Loading... </div>
                }
                {
                    childData.length === 0 ? 
                    <div> No child loaded! </div> :
                    childData.map((child) => (
                        child.sessionId ?
                        <ChildCard key={child.sessionId.toString()} childInfo={child} /> :
                        <></>
                    ))
                }
                <RouterButton page="/" buttonString = "Wroc do głownej"/>
            </div>

            <button onClick={() => test(logged)}>Show me if logged!</button>
        </div>
    );
};

export default Page;