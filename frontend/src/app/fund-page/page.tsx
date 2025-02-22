// import FundForm from "@/components/fundForm";

// const FundPage = () => {
//     return (
//         <div className="flex flex-col items-start min-h-screen w-full" 
//       style={{
//         backgroundImage: "url('/assets/fund_background.png')",
//         backgroundSize: "cover",}}>
//             <div className=" text-right font-anton text-marine mt-6 ml-60 mb-5" style={{ fontSize: '45px' }}>KREATOR ZBIÓREK</div>
//             <FundForm />
//         </div>
//     );
// }

// export default FundPage;

import FundForm from "@/components/fundForm";
import RouterButton from "@/components/routerButton";

const FundPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full"
            style={{
                backgroundImage: "url('/assets/fund_background.png')",
                backgroundSize: "cover",
            }}>
            <div className=" items-start  font-anton text-marine mt-6 ml-60 mb-5" style={{ fontSize: '45px' }}>KREATOR ZBIÓREK</div>
            <div className="flex w-full">
                <div className="w-1/2 p-4 ml-10">
                    <FundForm />
                </div>
                <div className="ml-32">
                    <img src="/assets/hand_with_money.png"  className="" />
                </div>
            </div>
        
        </div>
    );
}

export default FundPage;

