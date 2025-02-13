import RouterButton from "./routerButton";

const FundForm = () => {
    return (
        <>
            <form className="flex flex-col  w-[740px] h-[700px] ml-10">
            
            <div className="flex flex-col items-start">
                <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">TYTUŁ ZBIÓRKI:</p>
                <input type="text" placeholder="Podaj tytuł zbiórki..." className=" w-[62%] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
            </div>

            <div className="flex flex-row items-start gap-x-10">
                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">DATA ROZPOCZĘCIA:</p>
                    <input type="date" placeholder="Wybierz datę..." className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>

                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">DATA ZAKOŃCZENIA:</p>
                    <input type="date" placeholder="Fund Description" className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>
            </div>
           
            <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">KWOTA:</p>
                    <input type="number" placeholder="Podaj kwotę..." className="w-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>

                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">OPIS ZBIÓRKI:</p>
                    <textarea placeholder="Podaj opis zbiórki..." className="w-[720px] h-[200px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>
                
            
                
                <div className="flex flex-row items-end gap-x-16">

                <div className="flex flex-col items-start">
                    <p className=" ml-3 text-dark_blue font-[Open_Sans] font-bold">WYBIERZ KLASĘ:</p>
                    <input type="class" placeholder="Wybierz klasę..." className=" w-[450px] border border-dark_blue rounded-md p-2 m-2 placeholder-dark_blue focus:border-marine focus:outline-none text-dark_blue" />
                </div>

                <input type="submit" value="STWÓRZ ZBIÓRKE" className="bg-marine font-bold text-white rounded-md w-[200px] h-[43px] mb-2" />
                </div>
              

            </form>

            <div className="flex flex-col items-center">
            {/* <RouterButton page="/" buttonString="Wróć do głównej" color="bg-marine" width="w-[250px]" height="h-[60px]"/> */}
            </div>

        </>     
    )
}

export default FundForm;