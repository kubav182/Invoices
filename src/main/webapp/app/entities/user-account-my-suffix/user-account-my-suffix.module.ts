import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoicesSharedModule } from 'app/shared';
import {
    UserAccountMySuffixComponent,
    UserAccountMySuffixDetailComponent,
    UserAccountMySuffixUpdateComponent,
    UserAccountMySuffixDeletePopupComponent,
    UserAccountMySuffixDeleteDialogComponent,
    userAccountRoute,
    userAccountPopupRoute
} from './';

const ENTITY_STATES = [...userAccountRoute, ...userAccountPopupRoute];

@NgModule({
    imports: [InvoicesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserAccountMySuffixComponent,
        UserAccountMySuffixDetailComponent,
        UserAccountMySuffixUpdateComponent,
        UserAccountMySuffixDeleteDialogComponent,
        UserAccountMySuffixDeletePopupComponent
    ],
    entryComponents: [
        UserAccountMySuffixComponent,
        UserAccountMySuffixUpdateComponent,
        UserAccountMySuffixDeleteDialogComponent,
        UserAccountMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoicesUserAccountMySuffixModule {}
