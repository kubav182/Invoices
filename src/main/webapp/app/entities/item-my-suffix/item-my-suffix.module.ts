import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoicesSharedModule } from 'app/shared';
import {
    ItemMySuffixComponent,
    ItemMySuffixDetailComponent,
    ItemMySuffixUpdateComponent,
    ItemMySuffixDeletePopupComponent,
    ItemMySuffixDeleteDialogComponent,
    itemRoute,
    itemPopupRoute
} from './';

const ENTITY_STATES = [...itemRoute, ...itemPopupRoute];

@NgModule({
    imports: [InvoicesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ItemMySuffixComponent,
        ItemMySuffixDetailComponent,
        ItemMySuffixUpdateComponent,
        ItemMySuffixDeleteDialogComponent,
        ItemMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ItemMySuffixComponent,
        ItemMySuffixUpdateComponent,
        ItemMySuffixDeleteDialogComponent,
        ItemMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoicesItemMySuffixModule {}
