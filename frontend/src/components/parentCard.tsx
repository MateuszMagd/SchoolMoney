import { UserInfo } from "@/data/interfacesUser";
import Image from 'next/image';
import RouterButton from "./routerButton";

const ParentCard = ({ info }: { info: UserInfo }) => { 
    const { email, firstName, lastName, photo, pesel, userType } = info;

    return (

        <div className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg" style={{ height: '710px', width: '580px' }}>

           
            <div className="flex flex-col justify-center items-center h-[200px] mt-3">
                <Image src={photo} alt="photo" width={155} height={155} />
            </div>

            <div className="flex justify-center items-center space-x-2 ">
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{firstName}</div>
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{lastName}</div>
            </div>

            

            <div className="flex justify-center font-anton text-normal_blue" style={{ fontSize: '22px' }}>{userType}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-10" style={{ fontSize: '23px' }}>EMAIL</div>
            <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '22px' }}>{email}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-6" style={{ fontSize: '23px' }}>PESEL</div>
            <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{pesel}</div>
            <div className="flex justify-center font-anton text-normal_blue mt-6" style={{ fontSize: '23px' }}>Numer rachunku</div>
            {/* TODO: Change it to database value */}
            <div className="flex justify-center font-oswald text-normal_blue mb-10" style={{ fontSize: '20px' }}>01 2345 6789 1011 1213 1415 1617</div>

            <div className="flex flex-row items-center justify-center space-x-4">
                {/* TODO: Add functionality to this */}

                <RouterButton page="parent-details" buttonString="Edytuj" color="bg-dark_blue" width="w-[150px]" height="h-[50px] "/>
                <RouterButton page="parent-details" buttonString="Raporty"color="bg-dark_blue" width="w-[150px]" height="h-[50px]"/>
                <RouterButton page="parent-details/my-funds" buttonString="Zbiórki" color="bg-dark_blue" width="w-[150px]" height="h-[50px]"/>
            </div>
            
            
  
        </div>
    )
}

export default ParentCard;  