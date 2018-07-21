import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';

type EntityResponseType = HttpResponse<IContractorMySuffix>;
type EntityArrayResponseType = HttpResponse<IContractorMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ContractorMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/contractors';

    constructor(private http: HttpClient) {}

    create(contractor: IContractorMySuffix): Observable<EntityResponseType> {
        return this.http.post<IContractorMySuffix>(this.resourceUrl, contractor, { observe: 'response' });
    }

    update(contractor: IContractorMySuffix): Observable<EntityResponseType> {
        return this.http.put<IContractorMySuffix>(this.resourceUrl, contractor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContractorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContractorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
