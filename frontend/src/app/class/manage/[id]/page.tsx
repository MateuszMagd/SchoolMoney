'use client';

import { decideOnCandidate, getAllCandidatesToClass, getAllKidsFromClass } from "@/connection/classAPI";
import { ChildInfo, ClassQueueInfo } from "@/data/interfacesUser";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ManageClassPage = () => {
    const [children, setChildren] = useState<ChildInfo[]>([]);
    const [candidates, setCandidates] = useState<ClassQueueInfo[]>([]);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => { 
        const fetchClass = async () => {
            if (id && typeof id === "string") {
                const data = await getAllKidsFromClass(id);
                setChildren(data);

                const queueData = await getAllCandidatesToClass(id);
                setCandidates(queueData);
            } else {
                alert("Invalid id");
            }
        }

        fetchClass();
    }, []);

    const reject = async(classQueueId: string) => {
        try {
            decideOnCandidate(classQueueId, false);
        } catch (error) {
            console.log(error);
        }
    }
    
    const accept = async(classQueueId: string) => {
        try {
            decideOnCandidate(classQueueId, true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            className="min-h-screen bg-center flex flex-col items-center space-y-20 p-10"
            style={{
                backgroundImage: "url('/assets/class_edit_background.png')",
                backgroundSize: "cover",}}>

        <div className="mt-20 container mx-auto bg-white rounded-[30px] shadow-2xl p-6 w-[650px] ">
              <h3 className="text-[55px] font-anton text-dark_blue mt-5 mb-10 text-center">KLASA</h3>
            <div>
            <h3 className="text-[25px] font-anton text-normal_blue mt-20 text-center">LISTA DZIECI</h3>
                <table className="table-auto font-[Open_Sans] text-[20px] text-dark_blue text-center ml-[10px]">
                    <thead className="text-[17px] font-bold text-center">
                        <tr>
                            <td className="px-[70px] py-5">IMIĘ</td>
                            <td className="px-[70px] py-5">NAZWISKO</td>
                            <td className="px-[70px] py-5">PESEL</td>
                        </tr>
                    </thead>
                    <tbody>
                    {children.map((child) => (
                        <tr key={child.sessionId} className="">
                            <td className="px-8">{child.firstName}</td>
                            <td className="px-8">{child.lastName}</td>
                            <td className="px-8">{child.pesel}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
             <h3 className="text-[25px] font-anton text-normal_blue mt-20 text-center">KANDYDACI</h3>
                <table className="table-auto font-[Open_Sans] text-[20px] text-dark_blue text-center ml-[20px]">
                    <thead className="text-[17px] font-bold text-center">
                        <tr>
                            <td className="px-6 py-5 whitespace-nowrap">IMIĘ I NAZWISKO</td>
                            <td className="px-6 py-5 whitespace-nowrap">NAZWA KLASY</td>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.sessionId}>
                                <td  className="px-6">{candidate.childFullName}</td>
                                <td  className="px-6">{candidate.classesName}</td>
                                <td  className="px-2"><button className="bg-light_blue text-white  w-[100px] h-[40px] rounded-lg text-[15px] mr-3" onClick={() => accept(candidate.sessionId)}>Akceptuj</button></td>
                                
                                <td  className="px-1"><button className="bg-light_marine text-white  w-[100px] h-[40px] rounded-lg text-[15px] mr-3" onClick={() => reject(candidate.sessionId)}>Odrzuć</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ManageClassPage;