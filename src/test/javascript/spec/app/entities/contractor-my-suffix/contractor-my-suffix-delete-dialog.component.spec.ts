/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InvoicesTestModule } from '../../../test.module';
import { ContractorMySuffixDeleteDialogComponent } from 'app/entities/contractor-my-suffix/contractor-my-suffix-delete-dialog.component';
import { ContractorMySuffixService } from 'app/entities/contractor-my-suffix/contractor-my-suffix.service';

describe('Component Tests', () => {
    describe('ContractorMySuffix Management Delete Component', () => {
        let comp: ContractorMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ContractorMySuffixDeleteDialogComponent>;
        let service: ContractorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [ContractorMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ContractorMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContractorMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContractorMySuffixService);
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
