export interface ICustomerMySuffix {
    id?: number;
    name?: string;
    identificationNumber?: string;
    taxIdentificationNumber?: string;
    street?: string;
    city?: string;
    postcode?: string;
    userId?: number;
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public identificationNumber?: string,
        public taxIdentificationNumber?: string,
        public street?: string,
        public city?: string,
        public postcode?: string,
        public userId?: number
    ) {}
}
