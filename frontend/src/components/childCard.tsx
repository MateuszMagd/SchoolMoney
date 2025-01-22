import { ChildInfo } from "@/data/interfacesUser";
import RouterButton from "./routerButton";
import Image from 'next/image';

const ChildCard = ({childInfo}: {childInfo: ChildInfo}) => {
    const { sessionId, firstName, lastName, photo, pesel, birthDate } = childInfo;
    console.log(photo);
    return (
        <div className="flex flex-col mx-auto bg-white rounded-[30px] shadow-lg"style={{ height: '535px', width: '585px' }}>
                <div>{firstName}</div>
                <div>{lastName}</div>
                <Image src={photo} alt="photo" width={100} height={100} />
                <div>{pesel}</div>
                <div>{birthDate}</div>
                <RouterButton page={`edit/child/${sessionId}`} buttonString="Edit"/>
        </div>
    )

 }

 export default ChildCard;  