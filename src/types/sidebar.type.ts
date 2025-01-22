import { ReactNode } from "react";
export type TUser = {
    userId: string;
    role: string;
    iat: number; 
    exp: number; 
  };
export type TRoute ={
    path : string,
    element : ReactNode
}
export type TUserPath = {
    name : string;
    path? : string;
    element? : ReactNode;
    children? : TUserPath[]
}
export type TAdminSidebarItem = {
    key : string;
    label : ReactNode;
    children? : TAdminSidebarItem[] ;
} | undefined;

export type TAuthState = {
    user : null | TUser;
    token : null | string;
}
