export interface IUserAccountMySuffix {
    id?: number;
    email?: string;
    password?: string;
    role?: string;
}

export class UserAccountMySuffix implements IUserAccountMySuffix {
    constructor(public id?: number, public email?: string, public password?: string, public role?: string) {}
}
