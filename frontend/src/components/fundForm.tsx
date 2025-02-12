"use client";

import { useEffect, useState } from "react";
import RouterButton from "./routerButton";
import { ClassInfo, FundInfo } from "@/data/interfacesUser";
import { getAllClassesFromUserAndUserKids } from "@/connection/classAPI";
import { createNewFund } from "@/connection/fundAPI";

const FundForm = () => {
    const [possibleClasses, setPossibleClasses] = useState<ClassInfo[]>([]);
    const [formData, setFormData] = useState<FundInfo>({
        name: "",
        startDate: "",
        endDate: "",
        goal: 0,
        description: "",
        classSessionId: "",
    });

    useEffect(() => {
        const fetchPossibleClasses = async () => {
            const classData = await getAllClassesFromUserAndUserKids();
            setPossibleClasses(classData);
            formData.classSessionId = classData[0].sessionId;
        };

        fetchPossibleClasses();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            [name]: value
          };
        });
      };

      const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            [name]: value
          };
        });
      };

    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!formData) return;
        const { value } = e.target;
        console.log(value);
        setFormData({ ...formData, classSessionId: value });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response: boolean = await createNewFund(formData);
            if(response === false) {
                alert("Failed to create new fund.");
            } else {
                alert("Fund created.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowData = () => {
        console.log(formData);
    }

    return (
        <>  
            {possibleClasses.length === 0 ? 
            <p>Brak dostępnych klas</p> :
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input type="text" id="name" name="name"  placeholder="Fund Name" onChange={handleChange} className="border border-gray-300 rounded-md p-2 m-2" />

                <input type="date" id="startDate" name="startDate" onChange={handleChange} className="border border-gray-300 rounded-md p-2 m-2" />
                <input type="date" id="endDate" name="endDate" onChange={handleChange} className="border border-gray-300 rounded-md p-2 m-2" />

                <input type="number" id="goal" name="goal" placeholder="Fund Goal" onChange={handleChange} className="border border-gray-300 rounded-md p-2 m-2" />

                <textarea id="description" name="description" placeholder="Fund Description" onChange={handleChangeText} className="border border-gray-300 rounded-md p-2 m-2" />
                
                <select
                id="classSessionId"
                name="classSessionId"
                value={formData.classSessionId}
                className="border border-gray-300 rounded-md p-2 m-2"
                onChange={handleClassChange}>
                {possibleClasses.map((classInfo) => (
                    <option key={classInfo.sessionId} value={classInfo.sessionId}>
                        {classInfo.className}
                    </option>
                ))}
                </select>

                <input type="submit" value="Create Fund" className="bg-blue-500 text-white rounded-md p-2 m-2" />

            </form>
            }
            <button onClick={handleShowData}>Show current data!</button>

            <RouterButton page="/" buttonString = "Wroc do głownej"/>
        </>     
    )
}

export default FundForm;
