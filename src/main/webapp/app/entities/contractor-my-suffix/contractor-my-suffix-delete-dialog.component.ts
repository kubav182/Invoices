import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';
import { ContractorMySuffixService } from './contractor-my-suffix.service';

@Component({
    selector: 'jhi-contractor-my-suffix-delete-dialog',
    templateUrl: './contractor-my-suffix-delete-dialog.component.html'
})
export class ContractorMySuffixDeleteDialogComponent {
    contractor: IContractorMySuffix;

    constructor(
        private contractorService: ContractorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contractorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contractorListModification',
                content: 'Deleted an contractor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contractor-my-suffix-delete-popup',
    template: ''
})
export class ContractorMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contractor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContractorMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contractor = contractor;
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
