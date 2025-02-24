"use client"

import { askForAssigmentToClass, getAllClasses, getClassByChild } from "@/connection/classAPI";
import { ClassInfo } from "@/data/interfacesUser";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const FindClassForChildPage = () => {
    const [posibbleClasses, setPossibleClasses] = useState<ClassInfo[]>([]);
    const { id } = useParams<{ id: string }>();
    const router = useRouter();


    useEffect(() => {
        const fetchData = async() => {
            const data = await getAllClasses();
            setPossibleClasses(data);
        } 

        fetchData();
    }, []);

    const applyForClass = async(classId: string) => {
        try{
            const data = await askForAssigmentToClass(classId, id);

            if(data === true) {
                router.push("/");
            }
            else {
                alert("Something went wrong... please contact admin");
            }
            
        } catch (error) {
            console.log("Unknown error:", error);
        }
    };
    {/* TODO: Make it not able to apply twice if applied already */}
    return (
        <div className="flex flex-col min-h-screen space-y-14" 
        style={{
            backgroundImage: "url('/assets/parent_background.png')",
            backgroundSize: "cover",}}>

        <div className="container mx-auto bg-white rounded-[30px] shadow-2xl w-[580px] h-[530px] p-6 mt-20">
        <h3 className="text-[50px] font-anton text-dark_blue mt-5 mb-4 text-center">ZNAJDŹ KLASĘ</h3>

        <table className="table-auto w-full text-center font-[Open_Sans] text-[18px] text-dark_blue mt-20 mx-auto">
            <thead className="text-[20px] font-bold">
                <tr>
                    <th className="pb-4">NAZWA KLASY</th>
                    <th className="pb-4">AKCJA</th>
                </tr>
            </thead>
            <tbody>
                {posibbleClasses.map((classInfo) => (
                    <tr key={classInfo.sessionId} className="text-center">
                        <td className="py-2">{classInfo.className}</td>
                        <td className="py-2">
                            <button 
                                onClick={() => applyForClass(classInfo.sessionId)} 
                                className="bg-light_blue text-white  w-[100px] h-[40px] rounded-lg text-[15px] mr-3 ml-4"
                            >
                                Aplikuj
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        </div>
        </div>
    );
}
export default FindClassForChildPage;