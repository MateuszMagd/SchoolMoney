"use client"

import { ChildClassInfo, ChildInfo } from "@/data/interfacesUser";
import RouterButton from "./routerButton";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { getClassByChild } from "@/connection/classAPI";

const ChildCard = ({childInfo}: {childInfo: ChildInfo}) => {
    const { sessionId, firstName, lastName, photo, pesel, birthday } = childInfo;
    const [classData, setClassData] = useState<ChildClassInfo | null>(null);

    useEffect(() => {
         const getClassData = async () => {
             const data = await getClassByChild(sessionId);
             setClassData(data);
         }
         getClassData();

    }, [])

    const isChildClassInfo = (data: any): data is ChildClassInfo => {
        return typeof data === "object" && data !== null && 
               "patronFirstName" in data && "patronLastName" in data;
    };


    return (
        <div className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg"style={{ height: '750px', width: '585px' }}>

                <div className="flex justify-center items-center h-[200px] mt-7">
                    <Image src={photo} alt="photo" width={168} height={155} />
                </div>

                <div className="flex justify-center items-center space-x-2">
                    <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{firstName}</div>
                    <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{lastName}</div>
                </div>

                <div className="flex justify-center font-anton text-normal_blue mt-5" style={{ fontSize: '22px' }}>PESEL</div>
                <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{pesel}</div>

                <div className="flex justify-center font-anton text-normal_blue mt-5" style={{ fontSize: '22px' }}>Birthday</div>
                <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{birthday}</div>

                {/* TODO: Add functionality after class module done! */}
                <div className="flex justify-center font-anton text-normal_blue mt-5" style={{ fontSize: '22px' }}>Class</div>
                {isChildClassInfo(classData) ? 
                    <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{classData.className}</div> :
                    <div className="flex justify-center font-oswald text-normal_blue">
                        <RouterButton page={`class/find/${sessionId}`} buttonString="Znajdz klase!" color="bg-dark_blue" width="w-[150px]" height="h-[50px]"/>
                    </div>
                    
                }
                

                {/* TODO: Add functionality after class module done! */}
                <div className="flex justify-center font-anton text-normal_blue mt-5" style={{ fontSize: '22px' }}>Patron</div>
                {isChildClassInfo(classData) ?
                    <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{classData.patronFirstName + " " + classData.patronLastName}</div> :
                    <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>Brak patrona klasy!</div>
                }
                
               
                <div className="flex justify-center items-center mt-5 mb-5">
                    <RouterButton page={`edit/child/${sessionId}`} buttonString="Edytuj" color="bg-dark_blue" width="w-[150px]" height="h-[50px]"/>
                </div>
        </div>
    )

 }

 export default ChildCard;  