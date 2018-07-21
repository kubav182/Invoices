import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IInvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';
import { InvoiceMySuffixService } from './invoice-my-suffix.service';
import { IContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';
import { ContractorMySuffixService } from 'app/entities/contractor-my-suffix';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';
import { IItemMySuffix } from 'app/shared/model/item-my-suffix.model';
import { ItemMySuffixService } from 'app/entities/item-my-suffix';

@Component({
    selector: 'jhi-invoice-my-suffix-update',
    templateUrl: './invoice-my-suffix-update.component.html'
})
export class InvoiceMySuffixUpdateComponent implements OnInit {
    private _invoice: IInvoiceMySuffix;
    isSaving: boolean;

    contractors: IContractorMySuffix[];

    customers: ICustomerMySuffix[];

    items: IItemMySuffix[];
    invoiceDate: string;
    dueDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceMySuffixService,
        private contractorService: ContractorMySuffixService,
        private customerService: CustomerMySuffixService,
        private itemService: ItemMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoice }) => {
            this.invoice = invoice;
        });
        this.contractorService.query().subscribe(
            (res: HttpResponse<IContractorMySuffix[]>) => {
                this.contractors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomerMySuffix[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.itemService.query().subscribe(
            (res: HttpResponse<IItemMySuffix[]>) => {
                this.items = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.invoice.invoiceDate = moment(this.invoiceDate, DATE_TIME_FORMAT);
        this.invoice.dueDate = moment(this.dueDate, DATE_TIME_FORMAT);
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceMySuffix>>) {
        result.subscribe((res: HttpResponse<IInvoiceMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackContractorById(index: number, item: IContractorMySuffix) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomerMySuffix) {
        return item.id;
    }

    trackItemById(index: number, item: IItemMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get invoice() {
        return this._invoice;
    }

    set invoice(invoice: IInvoiceMySuffix) {
        this._invoice = invoice;
        this.invoiceDate = moment(invoice.invoiceDate).format(DATE_TIME_FORMAT);
        this.dueDate = moment(invoice.dueDate).format(DATE_TIME_FORMAT);
    }
}
