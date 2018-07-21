import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';
import { InvoiceMySuffixService } from './invoice-my-suffix.service';
import { InvoiceMySuffixComponent } from './invoice-my-suffix.component';
import { InvoiceMySuffixDetailComponent } from './invoice-my-suffix-detail.component';
import { InvoiceMySuffixUpdateComponent } from './invoice-my-suffix-update.component';
import { InvoiceMySuffixDeletePopupComponent } from './invoice-my-suffix-delete-dialog.component';
import { IInvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class InvoiceMySuffixResolve implements Resolve<IInvoiceMySuffix> {
    constructor(private service: InvoiceMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((invoice: HttpResponse<InvoiceMySuffix>) => invoice.body));
        }
        return of(new InvoiceMySuffix());
    }
}

export const invoiceRoute: Routes = [
    {
        path: 'invoice-my-suffix',
        component: InvoiceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-my-suffix/:id/view',
        component: InvoiceMySuffixDetailComponent,
        resolve: {
            invoice: InvoiceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-my-suffix/new',
        component: InvoiceMySuffixUpdateComponent,
        resolve: {
            invoice: InvoiceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-my-suffix/:id/edit',
        component: InvoiceMySuffixUpdateComponent,
        resolve: {
            invoice: InvoiceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoicePopupRoute: Routes = [
    {
        path: 'invoice-my-suffix/:id/delete',
        component: InvoiceMySuffixDeletePopupComponent,
        resolve: {
            invoice: InvoiceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
