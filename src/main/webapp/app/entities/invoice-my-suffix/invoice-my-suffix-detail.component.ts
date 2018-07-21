import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';

@Component({
    selector: 'jhi-invoice-my-suffix-detail',
    templateUrl: './invoice-my-suffix-detail.component.html'
})
export class InvoiceMySuffixDetailComponent implements OnInit {
    invoice: IInvoiceMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoice }) => {
            this.invoice = invoice;
        });
    }

    previousState() {
        window.history.back();
    }
}
