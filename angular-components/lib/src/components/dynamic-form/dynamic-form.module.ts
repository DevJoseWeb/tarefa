import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TooltipModule } from "primeng/tooltip";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { DropdownModule } from "primeng/dropdown";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AutoCompleteModule } from "primeng/autocomplete";

import { ControlErrorsModule } from "../control-errors/index";
import { LocaleModule } from "../locale/index";
import { DynamicFormComponent } from "./dynamic-form.component";

@NgModule({
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
    exports: [DynamicFormComponent],
})
export class DynamicFormModule { }
