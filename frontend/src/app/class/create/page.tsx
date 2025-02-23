'use client'

import { createNewClass } from "@/connection/classAPI";

const CreatePage = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 
        
        try {
            createNewClass(e.currentTarget["classname"].value)
        } catch (error) {
            console.error(error);
        }
        
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-14"
        style={{
            backgroundImage: "url('/assets/class_edit_background.png')",
            backgroundSize: "cover",
        }}>
         <div className="p-5 bg-white rounded-[30px] w-[580px] h-[730px] shadow-2xl justify-center items-center">
           <div className="font-anton text-dark_blue mt-[100px] mb-5 text-center" style={{ fontSize: '55px' }}>KREATOR KLAS</div>
           <label htmlFor="class-name" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans] ml-6 mt-20">Nazwa klasy:</label>
            <form className="flex flex-col items-center space-y-2" onSubmit={handleSubmit}>
    
                <input type="text" id="classname" name="classname" placeholder="Podaj nazwę nowej klasy"
                className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"></input>
                
                <div className="flex justify-center">
                    <button type="submit" className="w-[200px] h-[50px] bg-dark_blue text-white rounded-md mb-12 mt-12">Zapisz</button>
                </div>
               
            </form>
        </div>
        </div>
    );
};

export default CreatePage;