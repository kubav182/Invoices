import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IItemMySuffix } from 'app/shared/model/item-my-suffix.model';

type EntityResponseType = HttpResponse<IItemMySuffix>;
type EntityArrayResponseType = HttpResponse<IItemMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ItemMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/items';

    constructor(private http: HttpClient) {}

    create(item: IItemMySuffix): Observable<EntityResponseType> {
        return this.http.post<IItemMySuffix>(this.resourceUrl, item, { observe: 'response' });
    }

    update(item: IItemMySuffix): Observable<EntityResponseType> {
        return this.http.put<IItemMySuffix>(this.resourceUrl, item, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IItemMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IItemMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
