import { Authority } from "./users-response";

export interface MyUser {
    id: number;
    user: string;
    firstname: string;
    lastname: string;
    token: string;
    authorities: Authority[];
    empresa:    any;
}
