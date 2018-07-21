/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InvoicesTestModule } from '../../../test.module';
import { InvoiceMySuffixUpdateComponent } from 'app/entities/invoice-my-suffix/invoice-my-suffix-update.component';
import { InvoiceMySuffixService } from 'app/entities/invoice-my-suffix/invoice-my-suffix.service';
import { InvoiceMySuffix } from 'app/shared/model/invoice-my-suffix.model';

describe('Component Tests', () => {
    describe('InvoiceMySuffix Management Update Component', () => {
        let comp: InvoiceMySuffixUpdateComponent;
        let fixture: ComponentFixture<InvoiceMySuffixUpdateComponent>;
        let service: InvoiceMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [InvoiceMySuffixUpdateComponent]
            })
                .overrideTemplate(InvoiceMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvoiceMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InvoiceMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoice = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InvoiceMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoice = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
