"use client"
import { getUserData } from "@/connection/userAPI";
import { UserInfo, UserInfoExtended } from "@/data/interfacesUser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserForm from "@/components/edit-forms-user/userEdit";

const Page = () => {
    const [formData, setFormData] = useState<UserInfoExtended | null>(null);
    
    useEffect(() => {
        const getUserDatas = async () => {
            const data = await getUserData();
            console.log(data)
            setFormData(data);
        }

        getUserDatas();
      }, []);

    return (
      <div>
          {formData ? 
          <div>
            <UserForm userInfo={formData} />
          </div>
          : <div>Loading...</div>
        }
      </div>
       
    );
}

export default Page;