import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule as PrimeButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";

import { ButtonModule } from "../button/index";
import { DynamicFormModule } from "../dynamic-form/index";
import { EmptyStateModule } from "../empty-state/index";
import { LoadingStateModule } from "../loading-state/index";
import { LocaleModule } from "../locale/locale.module";
import { LookupComponent } from "./lookup.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CheckboxModule,
        PrimeButtonModule,
        ButtonModule,
        PanelModule,
        CommonModule,
        FormsModule,
        AutoCompleteModule,
        DialogModule,
        LocaleModule,
        TableModule,
        DynamicFormModule,
        EmptyStateModule,
        LoadingStateModule,
    ],
    declarations: [LookupComponent],
    exports: [LookupComponent],
    providers: [],
})
export class LookupModule {}
