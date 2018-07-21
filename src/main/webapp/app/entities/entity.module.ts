import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InvoicesUserAccountMySuffixModule } from './user-account-my-suffix/user-account-my-suffix.module';
import { InvoicesContractorMySuffixModule } from './contractor-my-suffix/contractor-my-suffix.module';
import { InvoicesCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { InvoicesInvoiceMySuffixModule } from './invoice-my-suffix/invoice-my-suffix.module';
import { InvoicesItemMySuffixModule } from './item-my-suffix/item-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        InvoicesUserAccountMySuffixModule,
        InvoicesContractorMySuffixModule,
        InvoicesCustomerMySuffixModule,
        InvoicesInvoiceMySuffixModule,
        InvoicesItemMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoicesEntityModule {}
