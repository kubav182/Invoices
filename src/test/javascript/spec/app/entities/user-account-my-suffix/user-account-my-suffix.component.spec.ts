/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InvoicesTestModule } from '../../../test.module';
import { UserAccountMySuffixComponent } from 'app/entities/user-account-my-suffix/user-account-my-suffix.component';
import { UserAccountMySuffixService } from 'app/entities/user-account-my-suffix/user-account-my-suffix.service';
import { UserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';

describe('Component Tests', () => {
    describe('UserAccountMySuffix Management Component', () => {
        let comp: UserAccountMySuffixComponent;
        let fixture: ComponentFixture<UserAccountMySuffixComponent>;
        let service: UserAccountMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [UserAccountMySuffixComponent],
                providers: []
            })
                .overrideTemplate(UserAccountMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserAccountMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAccountMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserAccountMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userAccounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
