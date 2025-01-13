// tokenHandler.tsx

import Cookies from "js-cookie";
import { UserType } from "./enums";

export function parseJwt(token: string)  {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};

export function getEmail(): string | undefined {
    const token = Cookies.get('token');
    if (!token) 
        return undefined;

    const data = parseJwt(token);
    return data.email;
};

export function getUserType(): string | undefined {
    const token = Cookies.get('token');
    if (!token) 
        return undefined;

    const data = parseJwt(token);
    return data.type;
};

export function isLogged(): boolean {
    const token = Cookies.get('token');
    return !!token;
};

export function checkTypeOfUser(): UserType | undefined {
    const token = Cookies.get('token');
    if (!token) 
        return undefined;

    const data = parseJwt(token);
    return data.typ;
}

export function getType(): string | undefined{
    return Cookies.get('type');
};

export const saveToken = (token: string) => {
    Cookies.set('token', token, { expires: 7 }); // Token expiares in 7 days
};
  
export const getToken = (): string | undefined => {
    return Cookies.get('token');
};

export const clearToken = () => {
    Cookies.remove('token');
}