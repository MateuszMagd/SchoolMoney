'use client';

import { loginUser } from "@/connection/userAPI";
import { isLogged } from "@/data/tokenHandler";
import { useRouter } from "next/navigation";
import { useState } from "react";


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

    const handleSubmit = (e: React.FormEvent) => {
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

        setError('');
        loginUser(formData.email, formData.password);
        if(isLogged()) {
            router.push(`/`);
        }
    };

    return (
        <form className="flex flex-col mx-auto bg-white p-10" onSubmit={handleSubmit}>
            <div className="text-center"> LOGOWANIE </div>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    placeholder="Wprowadź adres email"
                />
            </div>

            {/* Password */}
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Hasło:
                </label>
                    <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            placeholder="Wprowadź hasło"
                        />
            </div>

            {/* Submit button */}
            <div className="mb-4">
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Zaloguj się
                </button>
            </div>
        </form>
    );
}

export default LoginForm;