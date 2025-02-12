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
        <div className="flex flex-col items-center h-screen">
            <h1>Your classes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nazwa Klasy</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classData) => (
                        <tr key={classData.sessionId}>
                            <td>{classData.className}</td>
                            <td><RouterButton page={`class/manage/${classData.sessionId}`}buttonString="Manage"/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePage;