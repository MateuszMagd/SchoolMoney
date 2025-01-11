import { UserInfo, ChildInfo } from "./interfacesUser";
import { UserType } from "./enums";

export let userInfo: UserInfo = {
    email: "Mateusz",
    firstName: "Test",
    lastName: "Test Wiekszy",
    photo: "photo",
    pesel: "111222333",
    userRole: UserType.User,
}

export let childInfo: ChildInfo = {    
    sessionId: "1",
    firstName: "Kuba",
    lastName: "Test",
    photo: "photo",
    birthDate: "12-12-2012",
    pesel: "111222333",
}