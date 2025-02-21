'use client';

import { loginUser } from "@/connection/userAPI";
import { isLogged } from "@/data/tokenHandler";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
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
        // TODO: Check if some security is needed here - some base was made lol
        
        e.preventDefault(); // No default values

        // Simple (for now) data validation
        if(!formData.email || !formData.password) {
            setError('Wszystkie pola sa wymagane!');
            return;
        }
        
        // Checking emails - it will be checked again in backend I promise ;>
        if(!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Wprowadz prawidłowy adres email');
            return;
        }
        
        // Waiting for user to login or not
        try {
            const result: boolean = await loginUser(formData.email, formData.password);

            if(result === true) {
                alert('You have been successfully logged in!');
                router.push(`/`);
            } else {
                setError('You have not been logged in!');
            }
        }
        catch(error) {
            setError('Błąd logowania');
        }
    };

    return (
        <form className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg"style={{ height: '700px', width: '500px' }} onSubmit={handleSubmit}>
            
            <div className="text-center text-marine font-anton mt-20" style={{ fontSize: '54px' }}>
            LOGOWANIE
            </div>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Email */}
            <div className="mb-4 flex justify-center mt-28">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                   
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-[400px] mt-1 border-b text-dark_blue border-dark_blue focus:outline-none focus:border-dark_blue placeholder-dark_blue placeholder:text-lg pb-2 mx-auto"
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
                            className="w-[400px] mt-1 border-b border-dark_blue focus:outline-none focus:border-dark_blue placeholder-dark_blue placeholder:text-lg pb-2 mx-auto text-dark_blue"
                            placeholder="Hasło"
                        />
            </div>

            {/* Submit button */}
            <div className="mb-4 flex justify-center mt-24">
                <button
                    type="submit"
                    className="w-[200px] h-[50px] bg-marine text-white text-medium font-medium rounded-[15px] shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Zaloguj się
                </button>
            </div>
        </form>
    );
}

export default LoginForm;