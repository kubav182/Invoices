/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InvoicesTestModule } from '../../../test.module';
import { UserAccountMySuffixUpdateComponent } from 'app/entities/user-account-my-suffix/user-account-my-suffix-update.component';
import { UserAccountMySuffixService } from 'app/entities/user-account-my-suffix/user-account-my-suffix.service';
import { UserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';

describe('Component Tests', () => {
    describe('UserAccountMySuffix Management Update Component', () => {
        let comp: UserAccountMySuffixUpdateComponent;
        let fixture: ComponentFixture<UserAccountMySuffixUpdateComponent>;
        let service: UserAccountMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [UserAccountMySuffixUpdateComponent]
            })
                .overrideTemplate(UserAccountMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserAccountMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAccountMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserAccountMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userAccount = entity;
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
                    const entity = new UserAccountMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userAccount = entity;
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
