import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';

type EntityResponseType = HttpResponse<ICustomerMySuffix>;
type EntityArrayResponseType = HttpResponse<ICustomerMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CustomerMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/customers';

    constructor(private http: HttpClient) {}

    create(customer: ICustomerMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICustomerMySuffix>(this.resourceUrl, customer, { observe: 'response' });
    }

    update(customer: ICustomerMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICustomerMySuffix>(this.resourceUrl, customer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICustomerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICustomerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
