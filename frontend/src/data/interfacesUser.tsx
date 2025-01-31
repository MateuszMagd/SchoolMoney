import { UserType } from "./enums";

// ---------------User Info Interfaces---------------

export interface UserInfo {
    email: string,
    firstName: string,
    lastName: string,
    photo: string,
    pesel: string,
    userType: UserType,
};

export interface ChildInfo {
    sessionId?: string,
    firstName?: string,
    lastName?: string,
    photo: string,
    birthday?: string,
    pesel?: string,
};

// --------------- Register Interfaces---------------
export interface UserInfoExtended extends UserInfo{
    password: string,
};

// ---------------Chat Interfaces---------------