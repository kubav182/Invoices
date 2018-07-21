import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';

@Component({
    selector: 'jhi-contractor-my-suffix-detail',
    templateUrl: './contractor-my-suffix-detail.component.html'
})
export class ContractorMySuffixDetailComponent implements OnInit {
    contractor: IContractorMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contractor }) => {
            this.contractor = contractor;
        });
    }

    previousState() {
        window.history.back();
    }
}
