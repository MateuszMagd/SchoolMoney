import { ChildInfo } from "@/data/interfacesUser";
import RouterButton from "./routerButton";
import Image from 'next/image';

const ChildCard = ({childInfo}: {childInfo: ChildInfo}) => {
    const { sessionId, firstName, lastName, photo, pesel, birthDate } = childInfo;
    console.log(photo);
    return (
        <div className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg"style={{ height: '535px', width: '585px' }}>

                <div className="flex justify-center items-center h-[200px] mt-7">
                    <Image src={photo} alt="photo" width={168} height={155} />
                </div>

                <div className="flex justify-center items-center space-x-2">
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{firstName}</div>
                <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{lastName}</div>
                </div>

                <div className="flex justify-center font-anton text-normal_blue mt-10" style={{ fontSize: '22px' }}>PESEL</div>
                <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{pesel}</div>
                {/* <div>{birthDate}</div> */}
               
                <div className="flex justify-center items-center mt-12">
                    <RouterButton page={`edit/child/${sessionId}`} buttonString="Edytuj" color="bg-dark_blue" width="w-[150px]" height="h-[50px]"/>
                </div>
        </div>
    )

 }

 export default ChildCard;  