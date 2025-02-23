'use client';
import RouterButton from "@/components/routerButton";
import { getAllClassesFromUser } from "@/connection/classAPI";
import { ClassInfo } from "@/data/interfacesUser";
import { Router } from "lucide-react";
import { useEffect, useState } from "react";

const ManagePage = () => {
    const [classes, setClasses] = useState<ClassInfo[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const classesData = await getAllClassesFromUser();
            setClasses(classesData);
        }

        fetchClasses();
    },[]);


    return (
        <div className="flex flex-col min-h-screen space-y-14" 
            style={{
                backgroundImage: "url('/assets/class_edit_background.png')",
                backgroundSize: "cover",}}>

        <div className="container mx-auto bg-white rounded-[30px] shadow-2xl w-[580px] h-[530px] p-6 mt-20">
            <h3 className="text-[55px] font-anton text-dark_blue mt-5 mb-4 text-center">TWOJE KLASY</h3>
            <table className="table-auto w-full space-x-5 font-[Open_Sans] text-[18px] text-dark_blue mt-10">
                <thead className="text-[20px] font-bold ">
                    <tr>
                        <th className="pb-4">NAZWA KLASY</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classData) => (
                        <tr className="text-center pt-4" key={classData.sessionId}>
                            <td>{classData.className}</td>
                            <div className="flex justify-center items-center text-[15px]">
                                <td><RouterButton page={`class/manage/${classData.sessionId}`}buttonString="Zarządzaj" 
                                color="bg-dark_blue"
                                width="w-[180px]"
                                height="h-[40px]"/></td>
                            </div>
                         
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ManagePage;