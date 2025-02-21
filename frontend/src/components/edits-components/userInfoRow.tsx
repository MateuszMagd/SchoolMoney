import { UserInfo, UserInfoExtended } from "@/data/interfacesUser";
import Image from 'next/image';

interface UserInfoRowProps {
    user: UserInfoExtended;
    onDelete: () => void;
    onModify: () => void;
}

const UserInfoRow: React.FC<UserInfoRowProps> = ({ user, onDelete, onModify }) => {
    return (
        <tr className="text-center ">
            <td className="p-4">{user.firstName}</td>
            <td className="p-4">{user.lastName}</td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">{user.pesel}</td>
            <td className="p-4">{user.userType}</td>
            <td className="flex flex-row justify-center"><Image src={user.photo} alt="No photo" width={70} height={70} className=""/></td>
            <td>
                <button 
                    onClick={onModify} 
                    className="bg-light_blue text-white w-[100px] h-[50px] rounded-lg text-[15px] mr-3"
                >
                    Modyfikuj
                </button>
                <button 
                    onClick={onDelete} 
                    className="bg-light_marine text-white  w-[100px] h-[50px] rounded-lg text-[15px]"
                >
                    Usuń
                </button>
            </td>
        </tr>
    );
};

export default UserInfoRow;