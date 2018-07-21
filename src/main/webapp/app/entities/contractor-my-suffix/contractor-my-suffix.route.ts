import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';
import { ContractorMySuffixService } from './contractor-my-suffix.service';
import { ContractorMySuffixComponent } from './contractor-my-suffix.component';
import { ContractorMySuffixDetailComponent } from './contractor-my-suffix-detail.component';
import { ContractorMySuffixUpdateComponent } from './contractor-my-suffix-update.component';
import { ContractorMySuffixDeletePopupComponent } from './contractor-my-suffix-delete-dialog.component';
import { IContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ContractorMySuffixResolve implements Resolve<IContractorMySuffix> {
    constructor(private service: ContractorMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((contractor: HttpResponse<ContractorMySuffix>) => contractor.body));
        }
        return of(new ContractorMySuffix());
    }
}

export const contractorRoute: Routes = [
    {
        path: 'contractor-my-suffix',
        component: ContractorMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'invoicesApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contractor-my-suffix/:id/view',
        component: ContractorMySuffixDetailComponent,
        resolve: {
            contractor: ContractorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contractor-my-suffix/new',
        component: ContractorMySuffixUpdateComponent,
        resolve: {
            contractor: ContractorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contractor-my-suffix/:id/edit',
        component: ContractorMySuffixUpdateComponent,
        resolve: {
            contractor: ContractorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contractorPopupRoute: Routes = [
    {
        path: 'contractor-my-suffix/:id/delete',
        component: ContractorMySuffixDeletePopupComponent,
        resolve: {
            contractor: ContractorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
