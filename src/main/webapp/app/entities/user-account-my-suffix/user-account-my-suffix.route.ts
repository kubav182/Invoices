import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';
import { UserAccountMySuffixService } from './user-account-my-suffix.service';
import { UserAccountMySuffixComponent } from './user-account-my-suffix.component';
import { UserAccountMySuffixDetailComponent } from './user-account-my-suffix-detail.component';
import { UserAccountMySuffixUpdateComponent } from './user-account-my-suffix-update.component';
import { UserAccountMySuffixDeletePopupComponent } from './user-account-my-suffix-delete-dialog.component';
import { IUserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class UserAccountMySuffixResolve implements Resolve<IUserAccountMySuffix> {
    constructor(private service: UserAccountMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userAccount: HttpResponse<UserAccountMySuffix>) => userAccount.body));
        }
        return of(new UserAccountMySuffix());
    }
}

export const userAccountRoute: Routes = [
    {
        path: 'user-account-my-suffix',
        component: UserAccountMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.userAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-account-my-suffix/:id/view',
        component: UserAccountMySuffixDetailComponent,
        resolve: {
            userAccount: UserAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.userAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-account-my-suffix/new',
        component: UserAccountMySuffixUpdateComponent,
        resolve: {
            userAccount: UserAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.userAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-account-my-suffix/:id/edit',
        component: UserAccountMySuffixUpdateComponent,
        resolve: {
            userAccount: UserAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.userAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAccountPopupRoute: Routes = [
    {
        path: 'user-account-my-suffix/:id/delete',
        component: UserAccountMySuffixDeletePopupComponent,
        resolve: {
            userAccount: UserAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.userAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
