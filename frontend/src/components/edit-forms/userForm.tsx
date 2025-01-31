"use client"

import { useState } from "react";
import { UserInfoExtended } from "@/data/interfacesUser";
import { modifyUser } from '@/connection/adminAPI';
import RouterButton from '@/components/routerButton';
import Image from "next/image";
import { UserType } from "@/data/enums";
import { useRouter } from "next/navigation";

const UserFormAdmin = ({userInfo}: {userInfo: UserInfoExtended}) => {
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

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    let val = UserType.PARENT;
    if(value === UserType.ADMIN) {
      val = UserType.ADMIN;
    }
    console.log(val)
    setFormData({...formData, userType: val});
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
      await modifyUser(formData, oryginalEmail);
      router.push("/admin/main/users");
    }
      
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
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="birthDate"
                name="birthDate"
                value={repeatPassword || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Repeat Password:
              </label>
              <input
                type="password"
                id="birthDate"
                name="birthDate"
                value={formData.password || ""}
                onChange={handleChangeReapeatPassword}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-row mb-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                <Image src={formData.photo} alt="Uploaded Preview" width={100} height={100} />
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            <div className="mb-4">
              <label>
                User Role:
              </label>
              <select 
                id="userType"
                name="userType"
                value={formData.userType || ""}
                onChange={handleUserTypeChange}
                className="w-full p-2 border border-gray-300 rounded-md">
                {Object.entries(UserType).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value.charAt(0) + value.slice(1).toLowerCase()}
                  </option>
                ))}
              
              </select>
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
            <RouterButton page="/admin/main/users" buttonString = "Wroc do głownej"/>
      </div>
  )
};

export default UserFormAdmin;