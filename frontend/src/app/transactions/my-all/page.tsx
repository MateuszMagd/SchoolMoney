'use client';

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
                <h1 className="text-3xl">No transactions</h1>
            </div>
        );
    }

    return (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Transactions
          </h1>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Receiver
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Amount
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Text
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {tx.receiverFullName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {tx.amountSended}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {tx.operationType}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {tx.text}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
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
        </div>
      );
};

export default MyAllTransactionsPage;