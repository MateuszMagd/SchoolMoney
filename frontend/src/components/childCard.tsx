import { ChildInfo } from "@/data/interfacesUser";
import RouterButton from "./routerButton";
import Image from 'next/image';

const ChildCard = ({childInfo}: {childInfo: ChildInfo}) => {
    const { sessionId, firstName, lastName, photo, pesel, birthday } = childInfo;
    console.log(childInfo)
    return (
        <div className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg"style={{ height: '710px', width: '580px' }}>

                <div className="flex justify-center items-center h-[200px] mt-3">
                    <Image src={photo} alt="photo" width={158} height={155} />
                </div>

                <div className="flex justify-center items-center space-x-2 mt-5">
                    <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{firstName}</div>
                    <div className="font-anton text-normal_blue" style={{ fontSize: '32px' }}>{lastName}</div>
                </div>

                <div className="flex justify-center font-anton text-normal_blue mt-8" style={{ fontSize: '23px' }}>PESEL</div>
                <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{pesel}</div>

                <div className="flex justify-center font-anton text-normal_blue mt-6" style={{ fontSize: '23px' }}>Data urodzenia</div>
                <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '20px' }}>{birthday}</div>

                {/* TODO: Add functionality after class module done! */}
                <div className="flex justify-center font-anton text-normal_blue mt-6" style={{ fontSize: '23px' }}>Grupa</div>
                <div className="flex justify-center font-oswald text-normal_blue" style={{ fontSize: '22px' }}>1D</div>

                {/* TODO: Add functionality after class module done! */}
                <div className="flex justify-center font-anton text-normal_blue mt-6" style={{ fontSize: '23px' }}>Opiekun</div>
                <div className="flex justify-center font-oswald text-normal_blue mb-3" style={{ fontSize: '22px' }}>Edyta Nowak</div>
               
                <div className="flex justify-center items-center mt-5 mb-5">
                    <RouterButton page={`edit/child/${sessionId}`} buttonString="Edytuj" color="bg-dark_blue" width="w-[150px]" height="h-[50px]"/>
                </div>
        </div>
    )

 }

 export default ChildCard;  