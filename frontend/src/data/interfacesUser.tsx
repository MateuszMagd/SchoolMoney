import { UserType } from "./enums";

// --------------- Register Interfaces---------------
export interface NewUserRegister {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
};

// --------------- Admin User Interfaces---------------
export interface NewUserAdminPanel {
    email: string,
    password: string,
    pesel: string,
    userRole: UserType,
    photo: string,
};

// ---------------User Info Interfaces---------------

export interface UserInfo {
    email: string,
    firstName: string,
    lastName: string,
    photo: string,
    pesel: string,
    userRole: UserType,
};

export interface ChildInfo {
    sessionId: string,
    firstName: string,
    lastName: string,
    photo: string,
    birthDate: string,
    pesel: string,
};
// ---------------Chat Interfaces---------------