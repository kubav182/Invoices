import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoicesSharedModule } from 'app/shared';
import {
    InvoiceMySuffixComponent,
    InvoiceMySuffixDetailComponent,
    InvoiceMySuffixUpdateComponent,
    InvoiceMySuffixDeletePopupComponent,
    InvoiceMySuffixDeleteDialogComponent,
    invoiceRoute,
    invoicePopupRoute
} from './';

const ENTITY_STATES = [...invoiceRoute, ...invoicePopupRoute];

@NgModule({
    imports: [InvoicesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InvoiceMySuffixComponent,
        InvoiceMySuffixDetailComponent,
        InvoiceMySuffixUpdateComponent,
        InvoiceMySuffixDeleteDialogComponent,
        InvoiceMySuffixDeletePopupComponent
    ],
    entryComponents: [
        InvoiceMySuffixComponent,
        InvoiceMySuffixUpdateComponent,
        InvoiceMySuffixDeleteDialogComponent,
        InvoiceMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoicesInvoiceMySuffixModule {}
