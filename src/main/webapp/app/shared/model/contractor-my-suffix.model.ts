export interface IContractorMySuffix {
    id?: number;
    name?: string;
    identificationNumber?: string;
    taxIdentificationNumber?: string;
    street?: string;
    city?: string;
    postcode?: string;
    bankCode?: string;
    bankAccountNumber?: string;
    bankAccountPrefix?: string;
    userId?: number;
}

export class ContractorMySuffix implements IContractorMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public identificationNumber?: string,
        public taxIdentificationNumber?: string,
        public street?: string,
        public city?: string,
        public postcode?: string,
        public bankCode?: string,
        public bankAccountNumber?: string,
        public bankAccountPrefix?: string,
        public userId?: number
    ) {}
}
