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
            <div>Zbiórka: {fund.name}</div>
            <div>{fund.money}</div>
            {/*"TODO: Add date"*/}
            <div>10-10-2024</div>
            <div>10-10-2025</div>
            <div>{fund.description}</div>
            <div>{fund.classSessionId}</div>
            <div>{fund.statusType}</div>
        </div>
    )
}

export default showFundPage;