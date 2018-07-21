/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InvoicesTestModule } from '../../../test.module';
import { ItemMySuffixUpdateComponent } from 'app/entities/item-my-suffix/item-my-suffix-update.component';
import { ItemMySuffixService } from 'app/entities/item-my-suffix/item-my-suffix.service';
import { ItemMySuffix } from 'app/shared/model/item-my-suffix.model';

describe('Component Tests', () => {
    describe('ItemMySuffix Management Update Component', () => {
        let comp: ItemMySuffixUpdateComponent;
        let fixture: ComponentFixture<ItemMySuffixUpdateComponent>;
        let service: ItemMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [ItemMySuffixUpdateComponent]
            })
                .overrideTemplate(ItemMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ItemMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ItemMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.item = entity;
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
                    const entity = new ItemMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.item = entity;
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
