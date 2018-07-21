import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';

type EntityResponseType = HttpResponse<IUserAccountMySuffix>;
type EntityArrayResponseType = HttpResponse<IUserAccountMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class UserAccountMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/user-accounts';

    constructor(private http: HttpClient) {}

    create(userAccount: IUserAccountMySuffix): Observable<EntityResponseType> {
        return this.http.post<IUserAccountMySuffix>(this.resourceUrl, userAccount, { observe: 'response' });
    }

    update(userAccount: IUserAccountMySuffix): Observable<EntityResponseType> {
        return this.http.put<IUserAccountMySuffix>(this.resourceUrl, userAccount, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserAccountMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserAccountMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
