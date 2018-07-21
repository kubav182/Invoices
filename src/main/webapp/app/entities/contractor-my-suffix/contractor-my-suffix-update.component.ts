import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';
import { ContractorMySuffixService } from './contractor-my-suffix.service';
import { IUserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';
import { UserAccountMySuffixService } from 'app/entities/user-account-my-suffix';

@Component({
    selector: 'jhi-contractor-my-suffix-update',
    templateUrl: './contractor-my-suffix-update.component.html'
})
export class ContractorMySuffixUpdateComponent implements OnInit {
    private _contractor: IContractorMySuffix;
    isSaving: boolean;

    useraccounts: IUserAccountMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private contractorService: ContractorMySuffixService,
        private userAccountService: UserAccountMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contractor }) => {
            this.contractor = contractor;
        });
        this.userAccountService.query().subscribe(
            (res: HttpResponse<IUserAccountMySuffix[]>) => {
                this.useraccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.contractor.id !== undefined) {
            this.subscribeToSaveResponse(this.contractorService.update(this.contractor));
        } else {
            this.subscribeToSaveResponse(this.contractorService.create(this.contractor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContractorMySuffix>>) {
        result.subscribe((res: HttpResponse<IContractorMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserAccountById(index: number, item: IUserAccountMySuffix) {
        return item.id;
    }
    get contractor() {
        return this._contractor;
    }

    set contractor(contractor: IContractorMySuffix) {
        this._contractor = contractor;
    }
}
