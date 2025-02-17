'use client'
import { addNewUser } from "@/connection/userAPI";
import { NewUserRegister } from "@/data/interfacesUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddPage = () => {
        const router = useRouter();
        const [formData, setFormData] = useState({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        });
        const [error, setError] = useState<string>('');
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // Aktualizacja wartości odpowiedniego pola formularza
            }));
        };
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault(); // No default values
    
            // Simple (for now) data validation
            if(!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
                setError('Wszystkie pola sa wymagane!');
                return;
            }
            
            // Checking emails - it will be checked again in backend I promise ;>
            if(!/\S+@\S+\.\S+/.test(formData.email)) {
                setError('Wprowadz prawidłowy adres email');
                return;
            }
            // Create a new user object
            const newUser: NewUserRegister = {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
            };
    
            setError('');
            try {
                const result: boolean = await addNewUser(newUser)
                if(result === true) {
                    router.push(`/admin/main/users`);
                } else {
                    setError("Błąd rejestracji");
                }
                
            } 
            catch (error) {
                setError("Some bigger error occured - contact with admin");
            }
    };
    
    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center" 
            style={{ backgroundImage: "url('/assets/admin_background.png')" }} 
        >
            <form onSubmit={handleSubmit} className="flex flex-col  bg-white rounded-[30px] shadow-2xl w-[1000px] p-6">
            
                <h3 className="text-[50px] font-anton text-dark_blue mt-5 mb-4 text-center">REJESTRACJA UŻYTKOWNIKA</h3>
    
                {error && <div className="text-red-500 mb-4">{error}</div>}
    
                {/* Name */}
                <div className="ml-9  mt-3">
                <label htmlFor="firstName" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        Imię:
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                       
                    />
                </div>
    
                {/* Lastname */}
                <div className="ml-9 mt-3">
                <label htmlFor="firstName" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        Nazwisko:
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                    />
                </div>
    
                {/* Email */}
                <div className="ml-9 mt-3">
                <label htmlFor="firstName" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                    />
                </div>
    
                {/* Password */}
                <div className="ml-9 mb-4 mt-3">
                <label htmlFor="firstName" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                        Hasło:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
                    />
                </div>
                <button type="submit" className="w-[90%] ml-9 h-[50px] bg-dark_blue text-center text-white rounded-md mt-5 ">Zarejestruj</button>
            </form>
        </div>
    );
    
}

export default AddPage;