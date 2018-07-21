import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';
import { UserAccountMySuffixService } from './user-account-my-suffix.service';

@Component({
    selector: 'jhi-user-account-my-suffix-delete-dialog',
    templateUrl: './user-account-my-suffix-delete-dialog.component.html'
})
export class UserAccountMySuffixDeleteDialogComponent {
    userAccount: IUserAccountMySuffix;

    constructor(
        private userAccountService: UserAccountMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userAccountListModification',
                content: 'Deleted an userAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-account-my-suffix-delete-popup',
    template: ''
})
export class UserAccountMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userAccount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserAccountMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userAccount = userAccount;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
