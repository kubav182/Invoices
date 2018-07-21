import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoicesSharedModule } from 'app/shared';
import {
    ContractorMySuffixComponent,
    ContractorMySuffixDetailComponent,
    ContractorMySuffixUpdateComponent,
    ContractorMySuffixDeletePopupComponent,
    ContractorMySuffixDeleteDialogComponent,
    contractorRoute,
    contractorPopupRoute
} from './';

const ENTITY_STATES = [...contractorRoute, ...contractorPopupRoute];

@NgModule({
    imports: [InvoicesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContractorMySuffixComponent,
        ContractorMySuffixDetailComponent,
        ContractorMySuffixUpdateComponent,
        ContractorMySuffixDeleteDialogComponent,
        ContractorMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ContractorMySuffixComponent,
        ContractorMySuffixUpdateComponent,
        ContractorMySuffixDeleteDialogComponent,
        ContractorMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoicesContractorMySuffixModule {}
