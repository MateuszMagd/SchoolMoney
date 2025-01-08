"use client"

import { useState } from "react";
import { UserInfoExtended } from "@/data/interfacesUser";
import { modifyUser } from '@/connection/adminAPI';
import RouterButton from '@/components/routerButton';

const UserFormAdmin = ({userInfo}: {userInfo: UserInfoExtended}) => {
  const [formData, setFormData] = useState<UserInfoExtended | null>(userInfo);
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

  const handleChangeReapeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!repeatPassword) return;
    const { value } = e.target;
    setRepeatPassword(value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // send data to the server
    if (formData && repeatPassword === formData.password)
      modifyUser(formData);
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
                type="date"
                id="birthDate"
                name="birthDate"
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
                onChange={handleChangeReapeatPassword}
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
                onChange={handleChange}
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

export default UserFormAdmin;