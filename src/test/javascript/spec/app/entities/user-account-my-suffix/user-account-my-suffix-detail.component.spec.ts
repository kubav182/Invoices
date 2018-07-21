/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InvoicesTestModule } from '../../../test.module';
import { UserAccountMySuffixDetailComponent } from 'app/entities/user-account-my-suffix/user-account-my-suffix-detail.component';
import { UserAccountMySuffix } from 'app/shared/model/user-account-my-suffix.model';

describe('Component Tests', () => {
    describe('UserAccountMySuffix Management Detail Component', () => {
        let comp: UserAccountMySuffixDetailComponent;
        let fixture: ComponentFixture<UserAccountMySuffixDetailComponent>;
        const route = ({ data: of({ userAccount: new UserAccountMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [UserAccountMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserAccountMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserAccountMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userAccount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
