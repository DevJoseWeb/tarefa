import { CommonModule } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipModule } from "primeng/tooltip";

import { StepsComponent, StepState } from "./steps.component";

describe("StepsComponent", () => {
    let component: StepsComponent;
    let fixture: ComponentFixture<StepsComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, NoopAnimationsModule, CommonModule, TooltipModule],
            declarations: [StepsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StepsComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        component.steps = [
            {
                id: "1",
                label: "Step 1",
                description: "Descrição detalhada do Step 1",
                disabled: false,
                state: StepState.Success,
            },
            {
                id: 2,
                label: "Step 2",
                description: "Descrição detalhada do Step 2",
                disabled: false,
                state: StepState.Warning,
            },
        ];

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct ID's", () => {
        expect(component.id).toMatch("s-steps-[d]*");
        expect(element.querySelector(`#${component.id}`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-step-1`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-step-2`)).toBeTruthy();

        const id = "test-id";
        component.id = id;
        fixture.detectChanges();

        expect(element.querySelector(`#${id}`)).toBeTruthy();
        expect(element.querySelector(`#${id}-step-1`)).toBeTruthy();
        expect(element.querySelector(`#${id}-step-2`)).toBeTruthy();
    });
});
