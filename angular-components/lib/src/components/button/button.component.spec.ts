import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TooltipModule } from "primeng/tooltip";

import { ButtonComponent } from "./button.component";

describe("ButtonComponent", () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
                CommonModule,
                TieredMenuModule,
                TooltipModule,
            ],
            declarations: [ButtonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct ID's", () => {
        expect(component.id).toMatch("s-button-[d]*");
        expect(element.querySelector(`#${component.id}`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-menu`)).toBeTruthy();

        const id = "test-id";
        component.id = id;
        fixture.detectChanges();

        expect(element.querySelector(`#${id}`)).toBeTruthy();
        expect(element.querySelector(`#${id}-menu`)).toBeTruthy();
    });

    it("should have the correct label", () => {
        component.label = "Ações";
        fixture.detectChanges();
        expect(element.querySelector(`#${component.id} .s-button-text`).innerHTML).toEqual("Ações");

        component.label = "Itens";
        fixture.detectChanges();
        expect(element.querySelector(`#${component.id} .s-button-text`).innerHTML).toEqual("Itens");
    });
});
