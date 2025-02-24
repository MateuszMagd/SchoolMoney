"use client";

import RouterButton from "@/components/routerButton";
import { getAllMyFunds } from "@/connection/fundAPI";
import { useEffect, useState } from "react";

const MyFundsPage = () => {
    const [funds, setFunds] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await getAllMyFunds(); 
            setFunds(data); 
        };

        getData();
    }, []);

    console.log(funds)

    return (
        <div className="p-4 min-h-screen"  style={{
            backgroundImage: "url('/assets/parent_background.png')",
            backgroundSize: "cover",
        }}>
           
            {funds.length > 0 ? (
                <div className="mt-20 container mx-auto bg-white rounded-[30px] shadow-2xl w-[1500px] p-6">
                      <h3 className="text-[50px] font-anton text-dark_blue mt-5 mb-10 text-center">MOJE ZBIÓRKI</h3>
                    <table className="table-auto w-full space-x-5 font-[Open_Sans] text-[18px] text-dark_blue text-center ">
                        <thead>
                            <tr className="text-[20px] font-bold text-center">
                                <th className="">NAZWA ZBIÓRKI</th>
                                <th className="">STATUS</th>
                                <th className="">KWOTA</th>
                                <th className="">DZIECKO</th>
                                <th className="">DATA URODZENIA</th>
                                <th className="">ZDJĘCIE</th>
                                <th className=""></th>
                            </tr>
                        </thead>
                        <tbody>
                            {funds.map((fund, index) => (
                                <tr
                                    key={index} 
                                    
                                >
                                    <td className="mb-10 ">{fund.name}</td>
                                    <td className={fund.status === "PAID" ? "text-dark_blue font-bold" : "text-alert_red font-bold"}>
                                        {fund.status === "PAID" ? "OPŁACONA" : "NIEOPŁACONA"}
                                    </td>

                                    <td className="">{fund.money} zł</td>
                                    <td className="">
                                        {fund.childDto.firstName} {fund.childDto.lastName}
                                    </td>
                                    <td className="">{fund.childDto.birthday}</td>
                                    <td className="">
                                        <img
                                            src={`data:image/png;base64,${fund.childDto.photo}`}
                                            alt={`${fund.childDto.firstName}'s photo`}
                                            className="ml-7 w-16 h-16 rounded-lg"
                                        />
                                    </td>
                                    <td className="text-center text-[15px]">
                                        <RouterButton
                                            page={`/fund-page/${fund.sessionId}`}
                                            buttonString="Zobacz zbiórkę"
                                            color="bg-dark_blue"
                                            width="w-[150px]"
                                            height="h-[60px]"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                </div>
            ) : (
                <p className="text-gray-600">Loading...</p>
            )}

                <div className="mt-8 text-center">
                        <RouterButton
                            page="/"
                            buttonString="Wróć do głównej"
                            color="bg-dark_blue"
                            width="w-[250px]"
                            height="h-[60px]"
                        />
                    </div>
        </div>
    );
};

export default MyFundsPage;
