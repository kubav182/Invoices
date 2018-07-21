/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InvoicesTestModule } from '../../../test.module';
import { ItemMySuffixDetailComponent } from 'app/entities/item-my-suffix/item-my-suffix-detail.component';
import { ItemMySuffix } from 'app/shared/model/item-my-suffix.model';

describe('Component Tests', () => {
    describe('ItemMySuffix Management Detail Component', () => {
        let comp: ItemMySuffixDetailComponent;
        let fixture: ComponentFixture<ItemMySuffixDetailComponent>;
        const route = ({ data: of({ item: new ItemMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InvoicesTestModule],
                declarations: [ItemMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ItemMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ItemMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.item).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
