import { UserInfo } from "@/data/interfacesUser";
import Image from 'next/image';

const ParentCard = ({ info }: { info: UserInfo }) => { 
    const { email, firstName, lastName, photo, pesel, userRole } = info;
    return (
        <div className='flex flex-col bg-blue-500 rounded-md p-5'>
            <div>USER INFO</div>
            <Image src={photo} alt="photo" width={100} height={100} />
            <div>{email}</div>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{pesel}</div>
            <div>{userRole}</div>
        </div>
    )
}

export default ParentCard;  