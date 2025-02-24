import RouterButton from "@/components/routerButton";

const PageClasses = () => {
    return (
        <div className="flex flex-col min-h-screen w-full"
            style={{
                backgroundImage: "url('/assets/class_background.png')",
                backgroundSize: "cover",
            }}>

        <div className=" items-start  font-anton text-dark_blue mt-[50px] ml-[380px] mb-5" style={{ fontSize: '65px' }}>KLASY</div>
            <div className="flex w-full">
                <div className="w-[800px] p-4 ml-60 flex flex-col mt-[80px]">

                <div className="mb-6" style={{ fontSize: '20px' }}>
                    <RouterButton
                            page="class/create"
                            buttonString="Stwórz nową klasę"
                            color="bg-dark_blue"
                            width="w-[400px]"
                            height="h-[180px]"
                        />
                 </div>
                 <div className="" style={{ fontSize: '20px' }}>
                        <RouterButton
                            page="class/manage"
                            buttonString="Zarządzaj moimi klasami"
                            color="bg-dark_blue"
                            width="w-[400px]"
                            height="h-[180px]"
                        />
                     </div>
                </div>
                <div className="ml-10">
                    <img src="/assets/class.png"  className="" />
                </div>
            </div>
       
        </div>
    )
};

export default PageClasses;