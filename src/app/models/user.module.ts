import { Role } from "./role.module";

export class User {
    _id?:string;
    name?:string;
    email:string;
    password:string;
    token?:string;
    role?:Role;
}
