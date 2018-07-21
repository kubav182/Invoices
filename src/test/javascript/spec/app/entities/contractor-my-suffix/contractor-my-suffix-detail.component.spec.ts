/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InvoicesTestModule } from '../../../test.module';
import { ContractorMySuffixDetailComponent } from 'app/entities/contractor-my-suffix/contractor-my-suffix-detail.component';
import { ContractorMySuffix } from 'app/shared/model/contractor-my-suffix.model';

describe('Component Tests', () => {
    describe('ContractorMySuffix Management Detail Component', () => {
        let comp: ContractorMySuffixDetailComponent;
        let fixture: ComponentFixture<ContractorMySuffixDetailComponent>;
        const route = ({ data: of({ contractor: new ContractorMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [ContractorMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContractorMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContractorMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contractor).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
