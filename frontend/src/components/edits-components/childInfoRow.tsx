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
            <td>{child.firstName}</td>
            <td>{child.lastName}</td>
            <td>{child.pesel}</td>
            <td>{child.birthday}</td>
            <td className="flex flex-row justify-center"><Image src={child.photo} alt="No photo" width={70} height={70} className=""/></td>
            <td>
                <button 
                    onClick={onModify} 
                    className="bg-dark_blue text-white font-bold w-[120px] h-[50px] rounded-lg text-[13px] mr-3"
                >
                    MODYFIKUJ
                </button>
                <button 
                    onClick={onDelete} 
                    className="bg-light_blue text-white font-bold w-[120px] h-[50px] rounded-lg text-[13px] mr-3"
                >
                    USUŃ
                </button>
                <button 
                    onClick={showParent} 
                    className="bg-light_marine text-white font-bold w-[120px] h-[50px] rounded-lg text-[13px] mr-3"
                >
                    POKAŻ RODZICA
                </button>
            </td>
        </tr>
    );
};

export default UserInfoRow;