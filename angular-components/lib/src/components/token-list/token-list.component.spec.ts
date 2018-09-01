import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";

import { TokenListComponent } from "./token-list.component";

describe("TokenListComponent", () => {
    let component: TokenListComponent;
    let fixture: ComponentFixture<TokenListComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [TokenListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct ID's", () => {
        expect(component.id).toMatch("s-token-list-[d]*");
        expect(element.querySelector(`#${component.id}`)).toBeTruthy();

        const id = "test-id";
        component.id = id;
        fixture.detectChanges();

        expect(element.querySelector(`#${id}`)).toBeTruthy();
    });
});
