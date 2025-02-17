import { UserType } from "./enums";

// --------------- User Info Interfaces ---------------

export interface NewUserRegister {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
}

export interface UserInfo {
    email: string,
    firstName: string,
    lastName: string,
    photo: string,
    pesel: string,
    userType: UserType,
};

export interface ChildInfo {
    sessionId: string,
    firstName: string,
    lastName: string,
    photo: string,
    birthday: string,
    pesel: string,
};

export interface NewChildInfo {
    firstName: string,
    lastName: string,
    birthday: string,
    pesel: string,
};

// --------------- Register Interfaces ---------------
export interface UserInfoExtended extends UserInfo{
    password: string,
};

// --------------- Chat Interfaces --------------------

// -------------------- Classes -----------------------
export interface ClassInfo {
    sessionId: string,
    className: string,
};

export interface ExtendedClassInfo extends ClassInfo {
    children: ChildInfo[],
};

export interface ChildClassInfo extends ClassInfo {
    patronFirstName: string,
    patronLastName: string,
}


// -------------------- Fund -----------------------

export interface FundInfo {
    name: string,
    startDate: string,
    endDate: string,
    goal: number,
    description: string,
    classSessionId: string,
};