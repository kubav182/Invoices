/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InvoicesTestModule } from '../../../test.module';
import { ItemMySuffixDeleteDialogComponent } from 'app/entities/item-my-suffix/item-my-suffix-delete-dialog.component';
import { ItemMySuffixService } from 'app/entities/item-my-suffix/item-my-suffix.service';

describe('Component Tests', () => {
    describe('ItemMySuffix Management Delete Component', () => {
        let comp: ItemMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ItemMySuffixDeleteDialogComponent>;
        let service: ItemMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [ItemMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ItemMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ItemMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemMySuffixService);
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
