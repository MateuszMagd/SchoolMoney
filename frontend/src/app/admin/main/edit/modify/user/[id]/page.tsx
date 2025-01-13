"use client"

import { getUserByEmail } from "@/connection/adminAPI";
import { UserInfo, UserInfoExtended } from "@/data/interfacesUser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserFormAdmin from "@/components/edit-forms/userForm";

const Page = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState<UserInfoExtended | null>(null);
    
    useEffect(() => {
        const getUserData = async () => {
              if (id && typeof id === "string") {
                const data = await getUserByEmail(id);
                console.log(data)
                setFormData(data);
              }
              else {
                alert("Invalid id");
              }
        }

        getUserData();
      }, [id]);

    return (
      <div>
          {formData ? 
          <div>
            <UserFormAdmin userInfo={formData} />
          </div>
          : <div>Loading...</div>
        }
      </div>
       
    );
}

export default Page;