import { Moment } from 'moment';
import { IItemMySuffix } from 'app/shared/model//item-my-suffix.model';

export interface IInvoiceMySuffix {
    id?: number;
    number?: string;
    invoiceDate?: Moment;
    dueDate?: Moment;
    tax?: number;
    contractorId?: number;
    customerId?: number;
    items?: IItemMySuffix[];
}

export class InvoiceMySuffix implements IInvoiceMySuffix {
    constructor(
        public id?: number,
        public number?: string,
        public invoiceDate?: Moment,
        public dueDate?: Moment,
        public tax?: number,
        public contractorId?: number,
        public customerId?: number,
        public items?: IItemMySuffix[]
    ) {}
}
