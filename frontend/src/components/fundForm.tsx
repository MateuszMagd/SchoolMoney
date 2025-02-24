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
            console.log("ClassData:", classData);

            if (classData && classData.length > 0 && classData[0]) {
                setPossibleClasses(classData);
                setFormData((prev) => ({
                    ...prev,
                    classSessionId: classData[0].sessionId,
                }));
            }
        };

        fetchPossibleClasses();
    }, []);

    console.log("Possible:", possibleClasses);


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

    if(!possibleClasses) {
        return <p>Loading...</p>
    };

    return (
        <>

            {possibleClasses.length === 0 ? 
            <p>Brak dostępnych klas</p> :
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">TYTUŁ ZBIÓRKI:</p>
                    <input type="text" id="name" name="name" placeholder="Podaj tytuł zbiórki..." onChange={handleChange} className=" w-[450px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>
            
                <div className="flex flex-row items-start gap-x-10">
                    <div className="flex flex-col items-start">
                        <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">DATA ROZPOCZĘCIA:</p>
                        <input type="date" id="startDate" name="startDate" onChange={handleChange} placeholder="Wybierz datę..." className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                    </div>

                    <div className="flex flex-col items-start">
                        <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">DATA ZAKOŃCZENIA:</p>
                        <input type="date" id="endDate" name="endDate" onChange={handleChange} placeholder="Fund Description" className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                    </div>
                </div>
            
                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">KWOTA:</p>
                    <input type="number" id="goal" name="goal" placeholder="Fund Goal" onChange={handleChange} placeholder="Podaj kwotę..." className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>

                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">OPIS ZBIÓRKI:</p>
                    <textarea id="description" name="description" onChange={handleChangeText} placeholder="Podaj opis zbiórki..." className="w-[720px] h-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>
            
                <div className="flex flex-row items-end gap-x-16">
                  <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">WYBIERZ KLASĘ:</p>
                    <select
                    id="classSessionId"
                    name="classSessionId"
                    value={formData.classSessionId}
                    className=" w-[450px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue"
                    onChange={handleClassChange}>
                        {possibleClasses.map((classInfo) => (
                            <option key={classInfo.sessionId} value={classInfo.sessionId}>
                                {classInfo.className}
                            </option>
                        ))}
                    </select>
                  </div>
                  <input type="submit" value="Stwórz zbiórkę" className="bg-marine text-white rounded-md w-[200px] h-[43px] mb-1" />
                </div>
            </form>
            }

        
        </>     
    )
}

export default FundForm;
