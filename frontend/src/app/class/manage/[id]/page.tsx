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
        <div className="flex flex-col items-center space-y-8">
            <div>
                <h1 className="text-center">Manage Class</h1>
                <table>
                    <thead>
                        <tr className="flex flex-row space-x-4">
                            <td>Imie</td>
                            <td>Nazwisko</td>
                            <td>pesel</td>
                        </tr>
                    </thead>
                    <tbody>
                        {children.map((child) => (
                            <tr key={child.sessionId}>
                                <td>{child.firstName}</td>
                                <td>{child.lastName}</td>
                                <td>{child.pesel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h1 className="text-center">Kandydaci</h1>
                <table>
                    <thead>
                        <tr className="flex flex-row space-x-4">
                            <td>Imie i Nazwisko</td>
                            <td>Nazwa klasy</td>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.sessionId}>
                                <td>{candidate.childFullName}</td>
                                <td>{candidate.classesName}</td>
                                <td><button className="bg-green-600" onClick={() => accept(candidate.sessionId)}>Akceptuj</button></td>
                                <td><button className="bg-red-500" onClick={() => reject(candidate.sessionId)}>Odrzuć</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClassPage;