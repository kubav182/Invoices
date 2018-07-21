import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemMySuffix } from 'app/shared/model/item-my-suffix.model';

@Component({
    selector: 'jhi-item-my-suffix-detail',
    templateUrl: './item-my-suffix-detail.component.html'
})
export class ItemMySuffixDetailComponent implements OnInit {
    item: IItemMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
        });
    }

    previousState() {
        window.history.back();
    }
}
