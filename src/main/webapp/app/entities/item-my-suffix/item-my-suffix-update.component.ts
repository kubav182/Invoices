import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IItemMySuffix } from 'app/shared/model/item-my-suffix.model';
import { ItemMySuffixService } from './item-my-suffix.service';

@Component({
    selector: 'jhi-item-my-suffix-update',
    templateUrl: './item-my-suffix-update.component.html'
})
export class ItemMySuffixUpdateComponent implements OnInit {
    private _item: IItemMySuffix;
    isSaving: boolean;

    constructor(private itemService: ItemMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.item.id !== undefined) {
            this.subscribeToSaveResponse(this.itemService.update(this.item));
        } else {
            this.subscribeToSaveResponse(this.itemService.create(this.item));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IItemMySuffix>>) {
        result.subscribe((res: HttpResponse<IItemMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get item() {
        return this._item;
    }

    set item(item: IItemMySuffix) {
        this._item = item;
    }
}
