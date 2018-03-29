
export interface UsersResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    enabled: boolean;
    lastPasswordResetDate: any;
    authorities: Authority[];
}

export interface Authority {
    authority: string;
}

// http://json2ts.com/
