'use client'

import { addNewChild } from "@/connection/childAPI";
import { NewChildInfo } from "@/data/interfacesUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ChildAddPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        pesel: "",
        birthday: "",
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!formData.firstName || !formData.lastName || !formData.pesel || !formData.birthday) {
            setError('Wszystkie pola sa wymagane!');
            return;
        }

        const newUser: NewChildInfo = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthday: formData.birthday,
            pesel: formData.pesel,
        };

        setError('');
        try {
            const result = await addNewChild(newUser);
            if(result === true) {
                router.push(`/admin/main/children`);
            } else {
                setError("Błąd tworzenia nowego dziecka");
            }
        }
        catch (error) {
            console.log(error);
            setError("Wystąpił błąd - skontaktuj się z administratorem");
        }
    }

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/admin_background.png')" }}>

            <form onSubmit={handleSubmit} className="flex flex-col  bg-white rounded-[30px] shadow-2xl w-[1000px] p-6">
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <h3 className="text-[50px] font-anton text-dark_blue mt-5 mb-4 text-center">REJESTRACJA DZIECKA</h3>
                <div className="ml-9 mb-4 mt-3">
                    <label htmlFor="firstName" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        Imię:
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ""}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                    />
                </div>
    
                <div className="ml-9 mb-4">
                    <label htmlFor="lastName" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        Nazwisko:
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName || ""}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                    />
                </div>
    
                <div className="ml-9 mb-4 ">
                    <label htmlFor="pesel" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        PESEL:
                    </label>
                    <input
                        type="text"
                        id="pesel"
                        name="pesel"
                        value={formData.pesel || ""}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                    />
                </div>
    
                <div className="ml-9 mb-4">
                    <label htmlFor="birthDate" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        Data urodzenia:
                    </label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday || ""}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                    />
                </div>
    
                <button type="submit" className="w-[90%] ml-9 h-[50px] bg-dark_blue text-center text-white rounded-md mt-5 ">Zapisz</button>
            </form>
        </div>
    );
    
}

export default ChildAddPage;