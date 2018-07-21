import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';
import { UserAccountMySuffixService } from './user-account-my-suffix.service';

@Component({
    selector: 'jhi-user-account-my-suffix-update',
    templateUrl: './user-account-my-suffix-update.component.html'
})
export class UserAccountMySuffixUpdateComponent implements OnInit {
    private _userAccount: IUserAccountMySuffix;
    isSaving: boolean;

    constructor(private userAccountService: UserAccountMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userAccount }) => {
            this.userAccount = userAccount;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.userAccountService.update(this.userAccount));
        } else {
            this.subscribeToSaveResponse(this.userAccountService.create(this.userAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserAccountMySuffix>>) {
        result.subscribe((res: HttpResponse<IUserAccountMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get userAccount() {
        return this._userAccount;
    }

    set userAccount(userAccount: IUserAccountMySuffix) {
        this._userAccount = userAccount;
    }
}
