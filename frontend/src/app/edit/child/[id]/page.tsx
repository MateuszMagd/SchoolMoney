"use client"

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { ChildInfo } from "@/data/interfacesUser";
import { editChild, getChildBySessionId } from "@/connection/childAPI";
import RouterButton from '@/components/routerButton';

const ChildEditPage =() => {
  const { id } = useParams();
  const [formData, setFormData] = useState<ChildInfo | null>(null);

  useEffect(() => {
    const getChildData = async () => {
      if (id && typeof id === "string") {
        const data = await getChildBySessionId(id);
        setFormData(data);
      }
      else {
        alert("Invalid id");
      }
    };

    getChildData();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    // send data to the server
    if (formData)
      editChild(formData);
  };  
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-20">
      {formData ? (
        <form onSubmit={handleSubmit} className="p-5 bg-white rounded-[30px] w-[960px] h-[700px] shadow-xl">
          <h3 className="text-[55px] font-anton text-dark_blue mt-5 mb-4 text-center">DANE DZIECKA</h3>
          <div className=" ml-10 mb-4 mt-8">
          <label htmlFor="firstName" className="block text-[18px] font-medium text-dark_blue font-[Open_Sans]">
              Imię:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="w-[96%] p-2 border border-gray-300 text-blue-900 font-[Open_Sans] rounded-md"
            />
          </div>
  
          <div className="ml-10 mb-4 mt-8">
            <label htmlFor="lastName" className="block text-[18px] font-medium text-dark_blue font-[Open_Sans]">
              Nazwisko:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="w-[96%] p-2 border border-gray-300 text-blue-900 font-[Open_Sans] rounded-md"
            />
          </div>
  
          <div className="ml-10 mb-4 mt-8">
            <label htmlFor="pesel" className="block text-[18px] font-medium text-dark_blue font-[Open_Sans]">
              PESEL:
            </label>
            <input
              type="text"
              id="pesel"
              name="pesel"
              value={formData.pesel || ""}
              onChange={handleChange}
              className="w-[96%] p-2 border border-gray-300 text-blue-900 font-[Open_Sans] rounded-md"
            />
          </div>
  
          <div className="ml-10 mb-4 mt-8">
            <label htmlFor="birthDate" className="block text-[18px] font-medium text-dark_blue font-[Open_Sans]">
              Data urodzenia:
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate || ""}
              onChange={handleChange}
              className="w-[96%] p-2 border border-gray-300 text-blue-900 font-[Open_Sans] rounded-md"
            />
          </div>
  
          <div className="ml-10 mb-4 mt-8">
            <label htmlFor="photo" className="block text-[18px] font-medium text-dark_blue font-[Open_Sans]">
              Zdjęcie profilowe:
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo || ""}
              onChange={handleChange}
              className="w-[96%] p-2 border border-gray-300 text-blue-900 font-[Open_Sans] rounded-md"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
      <RouterButton page="/" buttonString="Wroc do głownej" />
    </div>
  );
  
};

export default ChildEditPage;