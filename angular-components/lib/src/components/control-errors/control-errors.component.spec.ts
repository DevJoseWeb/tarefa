import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from "@angular/forms";

import { ControlErrorsComponent } from "./control-errors.component";

describe("ControlErrorsComponent", () => {
    let component: ControlErrorsComponent;
    let fixture: ComponentFixture<ControlErrorsComponent>;
    let element: HTMLElement;

    let control: FormControl;
    let errorMessages: any;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, FormsModule, ReactiveFormsModule],
                declarations: [ControlErrorsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ControlErrorsComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        control = new FormControl(undefined, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d*$/)]);

        errorMessages = {
            required: "O campo é obrigatório",
            min: "O valor deve ser maior do que o fornecido",
            max: "O valor deve ser menor do que o fornecido",
            pattern: "Valor inválido",
        };

        component.control = control;
        component.errorMessages = errorMessages;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should return the errorMessage list correctly", () => {
        let errorList = component.getErrorMessagesList();
        expect(errorList.length).toEqual(0);

        control.markAsDirty();
        control.setValue(200);
        errorList = component.getErrorMessagesList();

        expect(errorList.length).toEqual(1);
        expect(errorList.find(error => error === errorMessages.max)).toBeDefined();
    });

    it("should not render errors when clean", () => {
        expect(fixture.nativeElement.querySelectorAll(".ui-messages-error").length).toEqual(0);
    });

    it("should not render errors when valid", () => {
        control.setValue(50);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll(".ui-messages-error").length).toEqual(0);
    });

    it("should render the errors correctly", () => {
        control.markAsDirty();

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll(".ui-messages-error")[0].textContent).toContain(errorMessages.required);

        control.setValue(0);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll(".ui-messages-error")[0].textContent).toContain(errorMessages.min);

        control.setValue(101);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll(".ui-messages-error")[0].textContent).toContain(errorMessages.max);

        control.setValue("test");
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll(".ui-messages-error")[0].textContent).toContain(errorMessages.pattern);

        control.setValue("101test");
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll(".ui-messages-error").length).toEqual(2);
    });
});
