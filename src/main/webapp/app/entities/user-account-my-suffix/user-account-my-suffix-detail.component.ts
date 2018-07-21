import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';

@Component({
    selector: 'jhi-user-account-my-suffix-detail',
    templateUrl: './user-account-my-suffix-detail.component.html'
})
export class UserAccountMySuffixDetailComponent implements OnInit {
    userAccount: IUserAccountMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userAccount }) => {
            this.userAccount = userAccount;
        });
    }

    previousState() {
        window.history.back();
    }
}
