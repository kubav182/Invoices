/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InvoicesTestModule } from '../../../test.module';
import { InvoiceMySuffixDeleteDialogComponent } from 'app/entities/invoice-my-suffix/invoice-my-suffix-delete-dialog.component';
import { InvoiceMySuffixService } from 'app/entities/invoice-my-suffix/invoice-my-suffix.service';

describe('Component Tests', () => {
    describe('InvoiceMySuffix Management Delete Component', () => {
        let comp: InvoiceMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<InvoiceMySuffixDeleteDialogComponent>;
        let service: InvoiceMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [InvoiceMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(InvoiceMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvoiceMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
