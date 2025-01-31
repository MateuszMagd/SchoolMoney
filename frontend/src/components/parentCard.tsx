import { UserInfo } from "@/data/interfacesUser";
import Image from 'next/image';
import RouterButton from "./routerButton";

const ParentCard = ({ info }: { info: UserInfo }) => { 
    const { email, firstName, lastName, photo, pesel, userType } = info;

    return (
        <div className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg" style={{ height: '815px', width: '550px' }}>
           
            <div className="flex flex-col justify-center items-center h-[200px] mt-7 mb-7">
                <Image src={photo} alt="photo" width={168} height={155} />
            </div>

            <div className="flex justify-center items-center space-x-2">
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{firstName}</div>
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{lastName}</div>
            </div>

            

            <div className="flex justify-center font-anton text-normal_blue" style={{ fontSize: '22px' }}>{userType}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-10" style={{ fontSize: '22px' }}>EMAIL</div>
            <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{email}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-10" style={{ fontSize: '22px' }}>PESEL</div>
            <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{pesel}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-10" style={{ fontSize: '22px' }}>Numer rachunku</div>
            {/* TODO: Change it to database value */}
            <div className="flex justify-center font-oswald text-normal_blue mb-10" style={{ fontSize: '20px' }}>01 2345 6789 1011 1213 1415 1617</div>
            <div className="flex flex-col items-center justify-center space-y-4 mb-10">
                {/* TODO: Add functionality to this */}
                <RouterButton page="/parent-details" buttonString="Edytuj" width="w-[150px]" height="h-[50px]"/>
                <RouterButton page="/parent-details" buttonString="Raporty" width="w-[150px]" height="h-[50px]"/>
            </div>
            
            
  
        </div>
    )
}

export default ParentCard;  