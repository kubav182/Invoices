import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';
import { InvoiceMySuffixService } from './invoice-my-suffix.service';

@Component({
    selector: 'jhi-invoice-my-suffix-delete-dialog',
    templateUrl: './invoice-my-suffix-delete-dialog.component.html'
})
export class InvoiceMySuffixDeleteDialogComponent {
    invoice: IInvoiceMySuffix;

    constructor(
        private invoiceService: InvoiceMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'invoiceListModification',
                content: 'Deleted an invoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-my-suffix-delete-popup',
    template: ''
})
export class InvoiceMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InvoiceMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.invoice = invoice;
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
