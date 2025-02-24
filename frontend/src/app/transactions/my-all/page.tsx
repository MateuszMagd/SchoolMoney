'use client';

import RouterButton from "@/components/routerButton";
import { getMyTransactions } from "@/connection/transactionAPI";
import { UserTransaction } from "@/data/interfacesUser";
import { useEffect, useState } from "react";

const MyAllTransactionsPage = () => {
    const [transactions, setTransactions] = useState<UserTransaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyTransactions();
            setTransactions(data);
        };

        fetchData();
    }, []);


    if(transactions.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                <h1 className="text-3xl font-anton text-dark_blue">No transactions</h1>
            </div>
        );
    }

    return (
      <div className="p-4 min-h-screen"  style={{
        backgroundImage: "url('/assets/admin_background.png')",
        backgroundSize: "cover",
    }}>
          
          {transactions.length > 0 ? (
            <div className="mt-20 container mx-auto bg-white rounded-[30px] shadow-2xl w-[1500px] p-6">
                 <h3 className="text-[50px] font-anton text-dark_blue mt-5 mb-10 text-center">HISTORIA TRANSAKCJI</h3>
              <table className="table-auto w-full space-x-5 font-[Open_Sans] text-[18px] text-dark_blue text-center ">
                <thead className="">
                  <tr className="text-[20px] font-bold text-center">
                    <th className="">
                      ODBIORCA / CEL
                    </th>
                    <th className="">
                      KWOTA
                    </th>
                    <th className="">
                      TYP
                    </th>
                    <th className="">
                      OPIS
                    </th>
                    <th className="">
                      DATA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "" : ""
                      } `}
                    >
                      <td className="px-4 py-5">
                        {tx.receiverFullName}
                      </td>
                      <td className=" px-4 py-5">
                        {tx.amountSended}
                      </td>
                      <td className="px-4 py-5">
                        {tx.operationType}
                      </td>
                      <td className="px-4 py-5">
                        {tx.text}
                      </td>
                      <td className="px-4 py-5">
                        {tx.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">No transactions found.</p>
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

export default MyAllTransactionsPage;