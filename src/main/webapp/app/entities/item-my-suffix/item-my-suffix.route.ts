import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemMySuffix } from 'app/shared/model/item-my-suffix.model';
import { ItemMySuffixService } from './item-my-suffix.service';
import { ItemMySuffixComponent } from './item-my-suffix.component';
import { ItemMySuffixDetailComponent } from './item-my-suffix-detail.component';
import { ItemMySuffixUpdateComponent } from './item-my-suffix-update.component';
import { ItemMySuffixDeletePopupComponent } from './item-my-suffix-delete-dialog.component';
import { IItemMySuffix } from 'app/shared/model/item-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ItemMySuffixResolve implements Resolve<IItemMySuffix> {
    constructor(private service: ItemMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((item: HttpResponse<ItemMySuffix>) => item.body));
        }
        return of(new ItemMySuffix());
    }
}

export const itemRoute: Routes = [
    {
        path: 'item-my-suffix',
        component: ItemMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'invoicesApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'item-my-suffix/:id/view',
        component: ItemMySuffixDetailComponent,
        resolve: {
            item: ItemMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'item-my-suffix/new',
        component: ItemMySuffixUpdateComponent,
        resolve: {
            item: ItemMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'item-my-suffix/:id/edit',
        component: ItemMySuffixUpdateComponent,
        resolve: {
            item: ItemMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const itemPopupRoute: Routes = [
    {
        path: 'item-my-suffix/:id/delete',
        component: ItemMySuffixDeletePopupComponent,
        resolve: {
            item: ItemMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoicesApp.item.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
