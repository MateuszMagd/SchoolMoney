'use client';

import { getFundBySessionId } from "@/connection/fundAPI";
import { FundExtendedInfo } from "@/data/interfacesUser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const showFundPage = () => {
    const { id } = useParams();
    const [fund, setFund] = useState<FundExtendedInfo | null>(null);

    useEffect(() => {
        const getData = async () => {
            if (id && typeof id === "string") {
                const data = await getFundBySessionId(id);
                setFund(data);
                console.log(data)
            }
        };

        getData();
    }, []);

    if(fund == null) {
        return <div>Nie ma ZBIÓRKI</div>
    }

    return (
        <div>
             <div className="flex flex-col min-h-screen w-full"
            style={{
                backgroundImage: "url('/assets/fund_background.png')",
                backgroundSize: "cover",
            }}>

            <div className=" items-start  font-anton text-marine mt-6 ml-[70px] mb-5" style={{ fontSize: '45px' }}>{fund.name}</div>
            <div className="flex w-full">
                <div className="w-1/2 p-4 ml-10">
                <div className="flex flex-col items-start">
               
                 {/*"TODO: Add date"*/}
                <div className="flex flex-row items-start gap-x-10">
                    <div className="flex flex-col items-start">
                        <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">DATA ROZPOCZĘCIA:</p>
                        <div className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue">10-10-2024</div>
                    </div>

                    <div className="flex flex-col items-start">
                        <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">DATA ZAKOŃCZENIA:</p>
                        <div className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue">10-10-2025</div>
                       
                    </div>
                </div>

                <div className="flex flex-row items-start gap-x-10">
                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">KLASA:</p>
                    <div className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue">{fund.classSessionId}</div>
                </div>

                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">STATUS:</p>
                    <div className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue">{fund.statusType}</div>
                </div>

                </div>
            
                
                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">KWOTA:</p>
                    <div className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue">{fund.money}zł</div>
                </div>

                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">OPIS ZBIÓRKI:</p>
                    <div className="w-[720px] h-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue">{fund.description}</div>
                </div>
            </div>
                </div>
                <div className="ml-32">
                    <img src="/assets/hand_with_money.png"  className="" />
                </div>
            </div>   
            
        </div>
        </div>
    )
}

export default showFundPage;