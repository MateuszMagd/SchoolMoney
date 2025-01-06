import { ChildInfo, UserInfo } from "@/data/interfacesUser";
import Image from 'next/image';

interface ChildInfoRowProps {
    child: ChildInfo;
    onDelete: () => void;
    onModify: () => void;
    showParent: () => void;
}

const UserInfoRow: React.FC<ChildInfoRowProps> = ({ child, onDelete, onModify, showParent }) => {
    return (
        <tr className="text-center">
            <td className="p-4">{child.firstName}</td>
            <td className="p-4">{child.lastName}</td>
            <td className="p-4">{child.pesel}</td>
            <td className="p-4">{child.birthDate}</td>
            <td className="flex flex-row justify-center"><Image src={child.photo} alt="No photo" width={100} height={100} className=""/></td>
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
                <button 
                    onClick={showParent} 
                    className="bg-red-500 text-white p-1 mx-1"
                >
                    Show Parents
                </button>
            </td>
        </tr>
    );
};

export default UserInfoRow;