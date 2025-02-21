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
        <div className="flex flex-col justify-center items-center space-y-6 p-10">
            <h1 className="text-3xl">Find Class For Your Child</h1>

            <table className="flex flex-col space-y-2">
                <thead className="flex flex-col space-x-6">
                    <tr>
                        <th>Name</th>
                        <th>Aplikuj</th>
                    </tr>
                </thead>
                <tbody>
                    {posibbleClasses.map((classInfo) => (
                        <tr key={classInfo.sessionId}>
                            <td>{classInfo.className}</td>
                            <td><button onClick={() => applyForClass(classInfo.sessionId)}>Apply</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default FindClassForChildPage;