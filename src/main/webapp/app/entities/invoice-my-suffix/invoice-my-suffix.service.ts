import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';

type EntityResponseType = HttpResponse<IInvoiceMySuffix>;
type EntityArrayResponseType = HttpResponse<IInvoiceMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/invoices';

    constructor(private http: HttpClient) {}

    create(invoice: IInvoiceMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoice);
        return this.http
            .post<IInvoiceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(invoice: IInvoiceMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoice);
        return this.http
            .put<IInvoiceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInvoiceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(invoice: IInvoiceMySuffix): IInvoiceMySuffix {
        const copy: IInvoiceMySuffix = Object.assign({}, invoice, {
            invoiceDate: invoice.invoiceDate != null && invoice.invoiceDate.isValid() ? invoice.invoiceDate.toJSON() : null,
            dueDate: invoice.dueDate != null && invoice.dueDate.isValid() ? invoice.dueDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.invoiceDate = res.body.invoiceDate != null ? moment(res.body.invoiceDate) : null;
        res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((invoice: IInvoiceMySuffix) => {
            invoice.invoiceDate = invoice.invoiceDate != null ? moment(invoice.invoiceDate) : null;
            invoice.dueDate = invoice.dueDate != null ? moment(invoice.dueDate) : null;
        });
        return res;
    }
}
