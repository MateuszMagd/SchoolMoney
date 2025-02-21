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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">My Funds</h1>
            {funds.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border border-gray-300 p-4 font-semibold">Fund Name</th>
                                <th className="border border-gray-300 p-4 font-semibold">Status</th>
                                <th className="border border-gray-300 p-4 font-semibold">Money</th>
                                <th className="border border-gray-300 p-4 font-semibold">Child Name</th>
                                <th className="border border-gray-300 p-4 font-semibold">Birthday</th>
                                <th className="border border-gray-300 p-4 font-semibold">Photo</th>
                                <th className="border border-gray-300 p-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funds.map((fund, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100`}
                                >
                                    <td className="border border-gray-300 p-4">{fund.name}</td>
                                    <td
                                        className={`border border-gray-300 p-4 ${
                                            fund.status === "PAID"
                                                ? "text-green-600 font-bold"
                                                : "text-red-600 font-bold"
                                        }`}
                                    >
                                        {fund.status}
                                    </td>
                                    <td className="border border-gray-300 p-4">{fund.money} zł</td>
                                    <td className="border border-gray-300 p-4">
                                        {fund.childDto.firstName} {fund.childDto.lastName}
                                    </td>
                                    <td className="border border-gray-300 p-4">{fund.childDto.birthday}</td>
                                    <td className="border border-gray-300 p-4">
                                        <img
                                            src={`data:image/png;base64,${fund.childDto.photo}`}
                                            alt={`${fund.childDto.firstName}'s photo`}
                                            className="w-16 h-16 rounded-lg"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-4 text-center">
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
                    <div className="mt-4">
                        <RouterButton
                            page="/"
                            buttonString="Wróć do głównej"
                            color="bg-dark_blue"
                            width="w-[150px]"
                            height="h-[60px]"
                        />
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Loading...</p>
            )}
        </div>
    );
};

export default MyFundsPage;
