import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';
import { Principal } from 'app/core';
import { UserAccountMySuffixService } from './user-account-my-suffix.service';

@Component({
    selector: 'jhi-user-account-my-suffix',
    templateUrl: './user-account-my-suffix.component.html'
})
export class UserAccountMySuffixComponent implements OnInit, OnDestroy {
    userAccounts: IUserAccountMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userAccountService: UserAccountMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userAccountService.query().subscribe(
            (res: HttpResponse<IUserAccountMySuffix[]>) => {
                this.userAccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserAccountMySuffix) {
        return item.id;
    }

    registerChangeInUserAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('userAccountListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
