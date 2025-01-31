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
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name:
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name:
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="pesel" className="block text-sm font-medium text-gray-700">
                    PESEL:
                </label>
                <input
                    type="text"
                    id="pesel"
                    name="pesel"
                    value={formData.pesel || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                    Birth Date:
                </label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Submit</button>
        </form>
    );
}

export default ChildAddPage;