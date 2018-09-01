import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { TooltipModule } from "primeng/tooltip";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { DropdownModule } from "primeng/dropdown";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ControlErrorsModule } from "../control-errors/control-errors.module";
import { LocaleModule } from "../locale/locale.module";

import { DynamicFormComponent } from "./dynamic-form.component";

describe("DynamicFormComponent", () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    TooltipModule,
                    InputTextModule,
                    CheckboxModule,
                    CalendarModule,
                    InputMaskModule,
                    DropdownModule,
                    CurrencyMaskModule,
                    ControlErrorsModule,
                    LocaleModule,
                    AutoCompleteModule
                ],
                declarations: [DynamicFormComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;

        component.form = new FormGroup({});

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
