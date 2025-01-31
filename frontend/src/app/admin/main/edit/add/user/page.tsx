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
        <form className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg"style={{ height: '700px', width: '500px' }} onSubmit={handleSubmit}>

            <div className="text-center text-marine font-anton mt-20" style={{ fontSize: '54px' }}>
                REJESTRACJA
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Name */}
            <div className="mb-4 flex justify-center mt-14">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                
            </label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-[400px] mt-1 border-b border-dark_blue focus:outline-none focus:border-dark_blue placeholder-dark_blue placeholder:text-lg pb-2 mx-auto"
                placeholder="Imię"
            />
            </div>

            
            {/* Lastname */}
            <div className="mb-4 flex justify-center mt-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-[400px] mt-1 border-b border-dark_blue focus:outline-none focus:border-dark_blue placeholder-dark_blue placeholder:text-lg pb-2 mx-auto"
                    placeholder="Nazwisko"
                />
            </div>

            {/* Email */}
            <div className="mb-4 flex justify-center mt-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-[400px] mt-1 border-b border-dark_blue focus:outline-none focus:border-dark_blue placeholder-dark_blue placeholder:text-lg pb-2 mx-auto"
                    placeholder="Email"
                />
            </div>

            {/* Password */}
            <div className="mb-4 flex justify-center mt-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                </label>
                    <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-[400px] mt-1 border-b border-dark_blue focus:outline-none focus:border-dark_blue placeholder-dark_blue placeholder:text-lg pb-2 mx-auto"
                            placeholder="Hasło"
                        />
            </div>

            {/* Submit button */}
            <div className="mb-4 flex justify-center mt-10">
            <button
                type="submit"
                className="w-[200px] h-[50px] bg-marine text-white text-medium font-medium rounded-[15px] shadow-md hover:shadow-lg transition-all duration-300"
                >
                Zarejestruj się
            </button>
            </div>
        </form>
    );
}

export default AddPage;