"use client";

import RouterButton from "@/components/routerButton";
import { deactivateFund, getAllMyFunds, getBetterAllMyFunds, resignFromFund } from "@/connection/fundAPI";
import { FundExtendedInfo } from "@/data/interfacesUser";
import { useEffect, useState } from "react";

const FundManagerPage = () => { 
    const [allMyFunds, setAllMyFunds] = useState<FundExtendedInfo[]>([]);

    useEffect(() => {
        const fetchAllMyFunds = async () => {
            const myFunds = await getBetterAllMyFunds();
            setAllMyFunds(myFunds);
            console.log("My funds:", myFunds);
        };

        fetchAllMyFunds();
    }, []);

    const handleResign =  async(sessionId: string) => {
        await resignFromFund(sessionId);
    };

    const handleDeactivate = async (sessionId: string) => {
        await deactivateFund(sessionId);
    };

    if (allMyFunds.length === 0) {
        return <div>No funds found.</div>;
    }

    return (
        <div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Start Date</th>
                        <th className="border border-gray-300 px-4 py-2">End Date</th>
                        <th className="border border-gray-300 px-4 py-2">Goal</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allMyFunds.map((fund) => (
                        <tr key={fund.sessionId} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{fund.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{fund.startDate || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{fund.endDate || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{fund.goal}</td>
                            <td className="border border-gray-300 px-4 py-2">{fund.description || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button 
                                    className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600"
                                    onClick={() => handleResign(fund.sessionId)}
                                >
                                    Resign
                                </button>
                                <button 
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                    onClick={() => handleDeactivate(fund.sessionId)}
                                >
                                    Deactivate
                                </button>
                                {/*<RouterButton page={`fund-page/edit/${fund.sessionId}`} buttonString="Przelewy" color="bg-light_blue" width="w-[200px]" height="h-[100px]"/> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FundManagerPage;
