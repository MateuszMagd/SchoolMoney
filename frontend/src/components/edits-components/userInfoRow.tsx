import { UserInfo, UserInfoExtended } from "@/data/interfacesUser";
import Image from 'next/image';

interface UserInfoRowProps {
    user: UserInfoExtended;
    onDelete: () => void;
    onModify: () => void;
}

const UserInfoRow: React.FC<UserInfoRowProps> = ({ user, onDelete, onModify }) => {
    return (
        <tr className="text-center">
            <td className="p-4">{user.firstName}</td>
            <td className="p-4">{user.lastName}</td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">{user.pesel}</td>
            <td className="p-4">{user.userType}</td>
            <td className="flex flex-row justify-center"><Image src={user.photo} alt="No photo" width={100} height={100} className=""/></td>
            <td>
                <button 
                    onClick={onModify} 
                    className="bg-blue-500 text-white p-1 mx-1"
                >
                    Modify
                </button>
                <button 
                    onClick={onDelete} 
                    className="bg-red-500 text-white p-1 mx-1"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default UserInfoRow;