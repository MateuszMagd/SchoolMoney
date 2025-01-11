"use client"

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { ChildInfo } from "@/data/interfacesUser";
import { editChild, getChildBySessionId } from "@/connection/childAPI";
import RouterButton from '@/components/routerButton';

const ChildEditPage =({childInfo}: {childInfo: ChildInfo}) => {
  const [formData, setFormData] = useState<ChildInfo | null>(childInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        // Ensure photo is a string
        setFormData((prev) => {
          if (!prev) return null; // Ensure previous state exists
          return {
            ...prev,
            photo: fileReader.result, // Set photo as a string
          };
        });
      } else {
        console.error("FileReader result is not a string.");
      }
    };
    fileReader.readAsDataURL(file); // Ensure result is a string (Base64 URL)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData)
      editChild(formData);
  };  

  return (
      <div>
        {formData ? 
          <form onSubmit={handleSubmit} className="p-5 bg-blue-100 rounded-md">
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
                id="birthDate"
                name="birthDate"
                value={formData.birthDate || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                <img src={formData.photo} alt="Uploaded Preview" className="w-32 h-32 object-cover rounded-md" />
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate || ""}
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Photo URL:
              </label>
              <input
                type="text"
                id="photo"
                name="photo"
                value={formData.photo || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
            : 
            <div>Loading...</div>
            }
            <RouterButton page="/" buttonString = "Wroc do głownej"/>
      </div>
  )
};

export default ChildEditPage;