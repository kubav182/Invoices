/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InvoicesTestModule } from '../../../test.module';
import { InvoiceMySuffixDetailComponent } from 'app/entities/invoice-my-suffix/invoice-my-suffix-detail.component';
import { InvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';

describe('Component Tests', () => {
    describe('InvoiceMySuffix Management Detail Component', () => {
        let comp: InvoiceMySuffixDetailComponent;
        let fixture: ComponentFixture<InvoiceMySuffixDetailComponent>;
        const route = ({ data: of({ invoice: new InvoiceMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [InvoiceMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InvoiceMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvoiceMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.invoice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
