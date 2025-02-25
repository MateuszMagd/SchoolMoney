"use client"

import { useState } from "react";
import { UserInfoExtended } from "@/data/interfacesUser";
import RouterButton from '@/components/routerButton';
import Image from "next/image";
import { UserType } from "@/data/enums";
import { useRouter } from "next/navigation";
import { modifyUser } from "@/connection/userAPI";

const UserForm = ({userInfo}: {userInfo: UserInfoExtended}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserInfoExtended>(userInfo);
  const [oryginalEmail, setOryginalEmail] = useState<string | null>(userInfo.email);
  const [repeatPassword, setRepeatPassword] = useState<string | null>(userInfo.password);

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
    if(e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as String;
        setFormData({...formData, photo:base64String.split(",")[1]}) 
      };
      reader.readAsDataURL(file);
    }
  };


  const handleChangeReapeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!repeatPassword) return;
    const { value } = e.target;
    setRepeatPassword(value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData && repeatPassword === formData.password && oryginalEmail)
    {
      await modifyUser(formData);
      router.push("/parent-details");
    }
      
  };  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-14" 
      style={{
        backgroundImage: "url('/assets/parent_background.png')",
        backgroundSize: "cover",}}>
      <div>
        {formData ? 
          <form onSubmit={handleSubmit} className="p-5 bg-white rounded-[30px] w-[580px] shadow-xl">
           <h3 className="text-[55px] font-anton text-dark_blue mt-5 mb-4 text-center">DANE RODZICA</h3>
           <div className=" ml-9 mt-8">
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

            <div className=" ml-9 mt-5">
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

            <div className=" ml-9 mt-5">
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

            <div className=" ml-9 mt-5">
              <label htmlFor="birthDate" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
              />
            </div>

            <div className=" ml-9 mt-5">
              <label htmlFor="birthDate" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                Hasło:
              </label>
              <input
                type="password"
                id="birthDate"
                name="birthDate"
                value={repeatPassword || ""}
                onChange={handleChange}
                className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
              />
            </div>

            <div className=" ml-9 mt-5">
              <label htmlFor="birthDate" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans]">
                Powtórz Hasło:
              </label>
              <input
                type="password"
                id="birthDate"
                name="birthDate"
                value={formData.password || ""}
                onChange={handleChangeReapeatPassword}
                className="w-[93%] p-2 border border-gray-300 font-[Open_Sans] rounded-md focus:border-dark_blue focus:outline-none text-dark_blue"
              />
            </div>

            <div className="ml-9 mt-5">
              <label htmlFor="photo" className="block text-[17px] font-medium text-dark_blue font-[Open_Sans] mb-5">
                Zdjęcie profilowe:
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handlePhotoChange}
                className="hidden"/>
              <label
                htmlFor="photo"
                className="w-[100px] h-[50px] p-3 bg-dark_blue text-white text-center rounded-md cursor-pointer mt-8 font-[Open_Sans]">
                Wybierz plik
              </label>
            </div>

            <div className="flex justify-center mt-20">
              <button
                type="submit"
                className="w-[200px] h-[50px] bg-dark_blue text-white rounded-md mb-12"
              >
                Zapisz zmiany
              </button>
            </div>
            </form>
            
            : 
            <div>Loading...</div>
            }
            <div className="flex justify-center mt-16 mb-6">
              <RouterButton page="/" buttonString="Wróć do głównej" color="bg-dark_blue" width="w-[250px]" height="h-[60px]"/>
            </div>
            
      </div>
      </div>
  )
};

export default UserForm;