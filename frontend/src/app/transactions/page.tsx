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
        <div className="flex flex-col justify-center items-center min-h-screen space-y-14"   
            style={{
            backgroundImage: "url('/assets/admin_background.png')",
            backgroundSize: "cover",}}>

        <div className="p-5 bg-white rounded-[30px] w-[580px] h-[730px] shadow-xl justify-center items-center">
        <h3 className="text-[55px] font-anton text-dark_blue mt-5 mb-12 text-center">TRANSAKCJE</h3>
            
        <div className="flex justify-center items-center"> 
            <form> 
                <select 
                    onChange={(e) => onSelectChange(e)}
                    className="w-[500px] items-center p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue" 
                >
                    <option value="" className="text-gray-500">Wybierz osobę / zbiórkę</option>
                    {transactionData.map((transaction, index) => (
                        <option key={index} value={transaction.name} className="text-dark_blue">
                            {transaction.name}
                        </option>
                    ))}
                </select>
            </form>
            </div>

            {selectedTransaction ?  (
                <div className="flex flex-col items-center space-y-4">
                    {/* <h2>Detale:</h2> */}
                    {/* <p>Imie/Nazwa Zbiórki: {selectedTransaction.name}</p> */}
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
                        <input type="number" id="amount" placeholder="Podaj kwotę" onChange={(e) => onChange(e)}
                        className="w-[400px] mt-10 p-3 border border-gray rounded-md focus:outline-none focus:border-dark_blue placeholder-dark_blue resize-none">
                        </input>
                        <textarea id="text" placeholder="Opis" onChange={(e) => setText(e.target.value)}
                        className="w-[400px] h-[120px] mt-10 p-3 border border-gray rounded-md focus:outline-none focus:border-dark_blue placeholder-dark_blue resize-none">
                        </textarea>
                       
                    </form>   
                </div>
            ) : (
                <div>
                    {/* <h2>Transaction details</h2> */}
                    {/* <p>No transaction selected</p> */}
                </div>
            )}

            <div className="flex flex-col justify-center items-center mt-10 space-y-5"  >
            
            <button className="w-[280px] h-[60px] p-5 bg-dark_blue text-white text-center rounded-lg hover:opacity-90 transition" type="submit">Zrób przelew</button>
            <RouterButton
                page="transactions/my-all"
                buttonString="Pokaż płatności"
                color="bg-light_blue"
                width="w-[280px]"
                height="h-[60px]"/>
            </div>
             </div>

             <RouterButton page="/" buttonString="Wróć do głównej" color="bg-marine" width="w-[250px]" height="h-[60px]"/>
        </div>
    );
};

export default TransactionPage;