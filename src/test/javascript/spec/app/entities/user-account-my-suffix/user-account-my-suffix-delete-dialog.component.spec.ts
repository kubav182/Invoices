/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InvoicesTestModule } from '../../../test.module';
import { UserAccountMySuffixDeleteDialogComponent } from 'app/entities/user-account-my-suffix/user-account-my-suffix-delete-dialog.component';
import { UserAccountMySuffixService } from 'app/entities/user-account-my-suffix/user-account-my-suffix.service';

describe('Component Tests', () => {
    describe('UserAccountMySuffix Management Delete Component', () => {
        let comp: UserAccountMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<UserAccountMySuffixDeleteDialogComponent>;
        let service: UserAccountMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [UserAccountMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(UserAccountMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserAccountMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAccountMySuffixService);
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
