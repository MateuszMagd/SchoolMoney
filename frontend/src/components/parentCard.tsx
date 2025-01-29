import { UserInfo } from "@/data/interfacesUser";
import Image from 'next/image';
import RouterButton from "./routerButton";

const ParentCard = ({ info }: { info: UserInfo }) => { 
    const { email, firstName, lastName, photo, pesel, userType } = info;
    return (
        <div className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg"style={{ height: '535px', width: '585px' }}>
           
           <div className="flex justify-center items-center h-[200px] mt-7">
                <Image src={photo} alt="photo" width={168} height={155} />
            </div>

            <div className="flex justify-center items-center space-x-2">
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{firstName}</div>
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{lastName}</div>
            </div>

            <div className="flex justify-center font-anton text-normal_blue" style={{ fontSize: '22px' }}>{userRole}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-10" style={{ fontSize: '22px' }}>EMAIL</div>
            <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{email}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-10" style={{ fontSize: '22px' }}>PESEL</div>
            <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{pesel}</div>
  
        </div>
    )
}

export default ParentCard;  