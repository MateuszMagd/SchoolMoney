"use client"

import RouterButton from "@/components/routerButton";
import { createTransaction, getAllPossibleTransactions } from "@/connection/transactionAPI";
import { Transaction } from "@/data/interfacesUser";
import { getToken } from "@/data/tokenHandler";
import { create } from "domain";
import React, { useEffect, useState } from "react";

const TransactionPage = () => {
    // There will be all possible transactions
    const [transactionData, setTransactionData] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [text, setText] = useState<string>("");
    
    useEffect(() => {
        const getData = async () => {
            const data = await getAllPossibleTransactions();
            setTransactionData(data);
            console.log(data);
        };

        getData();
    }, []);

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectedName= e.target.value;
        const foundTransaction = transactionData.find(
          (transaction) => transaction.name === selectedName
        );
        setSelectedTransaction(foundTransaction || null);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        setAmount(parseInt(e.target.value));
    };

    const onSubmit = async() => {
        if (selectedTransaction) {
            try {
                const token = getToken();
                if (!token) {
                    alert("You are not logged.");
                    return;
                }

                const responde: boolean = await createTransaction(selectedTransaction.sessionId, amount, selectedTransaction.payForWho ? selectedTransaction.payForWho : token, text);

                

                if(responde == true)
                {
                    alert("Transaction completed");
                }
                else
                {
                    alert("Transaction failed - check your balance or contact with administrator");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        } else {
            alert("Transaction not selected");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1>Transactions</h1>

            <form>
                <select onChange={(e) => onSelectChange(e)}>
                    <option value="">Select transaction</option>
                    {transactionData.map((transaction, index) => (
                        <option key={index} value={transaction.name}>
                            {transaction.name}
                        </option>
                    ))}
                </select>
            </form>

            {selectedTransaction ?  (
                <div className="flex flex-col items-center space-y-4">
                    <h2>Detale:</h2>
                    <p>Imie/Nazwa Zbiórki: {selectedTransaction.name}</p>
                    {selectedTransaction.amountNeeded != 0 ? (
                         <p>Pieniądze: {selectedTransaction.amountNeeded}</p>
                    ) :
                    (<></>)}
                    {selectedTransaction.description != null ? (
                        <p>Opis: {selectedTransaction.description}</p>
                    ) :
                    (<></>)}
                    {selectedTransaction.payForWho != null ? (
                        <p>Dla kogo: {selectedTransaction.payForWho}</p>
                    ) :
                    (<></>)}
                    <form onSubmit={() => onSubmit()} className="flex flex-col items-center space-y-4">
                        <input type="number" id="amount" placeholder="Ile chcesz przelać?" onChange={(e) => onChange(e)}></input>
                        <textarea id="text" placeholder="Opis" onChange={(e) => setText(e.target.value)}></textarea>
                        <button className="p-5 bg-blue-600 text-white" type="submit">Transakcja</button>
                    </form>   
                </div>
            ) : (
                <div>
                    <h2>Transaction details</h2>
                    <p>No transaction selected</p>
                </div>
            )}


            <RouterButton
                page="transactions/my-all"
                buttonString="Zobacz moje wszystkie transakcje"
                color="bg-dark_blue"
                width="w-[150px]"
                height="h-[60px]"/>

            <RouterButton page="/" buttonString="Wróć do głównej" color="bg-dark_blue" width="w-[150px]" height="h-[60px]"/>
        </div>
    );
};

export default TransactionPage;