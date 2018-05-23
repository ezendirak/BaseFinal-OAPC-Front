import { Authority } from "./users-response";

export interface MyUser {
    user: string;
    firstname: string;
    lastname: string;
    token: string;
    authorities: Authority[];
}
