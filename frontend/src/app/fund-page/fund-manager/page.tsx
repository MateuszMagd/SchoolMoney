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
        <div
        className="min-h-screen bg-center flex flex-col items-center space-y-20 p-10"
        style={{
            backgroundImage: "url('/assets/fund_background.png')",
            backgroundSize: "cover",}}>
        <div>
             <div className="mt-10 container mx-auto bg-white rounded-[30px] shadow-2xl w-[1200px] p-6">
             <h3 className="text-[52px] font-anton text-marine mt-5 mb-12 text-center">MENEDŻER ZBIÓREK</h3>
                <table className="table-auto w-full space-x-5 font-[Open_Sans] text-[18px] text-dark_blue">
                <thead className="text-[20px] font-bold">
                    <tr >
                        <th className="px-4 py-2">NAZWA</th>
                        <th className="px-4 py-2">DATA ROZPOCZĘCIA</th>
                        <th className="px-4 py-2">DATA ZAKOŃCZENIA</th>
                        <th className="px-4 py-2">CEL</th>
                        <th className="px-4 py-2">OPIS</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {allMyFunds.map((fund) => (
                        <tr key={fund.sessionId} className="text-center">

                            <td className="px-4 py-2">{fund.name}</td>
                            <td className="px-4 py-2">{fund.startDate || "N/A"}</td>
                            <td className="px-4 py-2">{fund.endDate || "N/A"}</td>
                            <td className="px-4 py-2">{fund.goal}</td>
                            <td className="px-4 py-2">{fund.description}</td>
                            <td className="px-4 py-2">
                                <button 
                                     onClick={() => handleResign(fund.sessionId)}
                                    className="bg-marine text-white  w-[120px] h-[50px] rounded-lg text-[15px] mr-3">
                                    Deaktywuj
                                </button>
                                <button 
                                    onClick={() => handleDeactivate(fund.sessionId)}
                                    className="bg-light_marine text-white w-[120px] h-[50px] rounded-lg text-[15px] mr-3">
                                    Zakończ
                                </button>
                                {/*<RouterButton page={`fund-page/edit/${fund.sessionId}`} buttonString="Przelewy" color="bg-light_blue" width="w-[200px]" height="h-[100px]"/> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </div>
    );
};

export default FundManagerPage;
