import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TranslateModule } from "@ngx-translate/core";
import {
    CustomFieldsModule,
    ControlErrorsModule,
    EmptyStateModule,
    LookupModule,
    DynamicFormModule,
    TokenListModule,
} from "@seniorsistemas/angular-components";
import { PanelModule } from "primeng/panel";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { TabViewModule } from "primeng/tabview";
import { SharedModule as PrimeSharedModule } from "primeng/shared";
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { StatsCardModule } from "@seniorsistemas/angular-components";
import { ComponentModule } from "~src/app/components/components.module";
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { UppercaseDirective } from "~app/core/directives/uppercase.directive";
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from "primeng/dialog";
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SpinnerModule } from 'primeng/spinner';

@NgModule({
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CurrencyMaskModule,
        TranslateModule,
        CustomFieldsModule,
        ControlErrorsModule,
        EmptyStateModule,
        LookupModule,
        DynamicFormModule,
        TokenListModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        TableModule,
        ConfirmDialogModule,
        CalendarModule,
        DropdownModule,
        TabViewModule,
        PrimeSharedModule,
        CardModule,
        TooltipModule,
        StatsCardModule,
        ComponentModule,
        MultiSelectModule,
        KeyFilterModule,
        UppercaseDirective,
        DialogModule,
        ChipsModule,
        AccordionModule,
        FieldsetModule,
        ScrollPanelModule,
        SpinnerModule
    ],
    declarations: [ UppercaseDirective ]
  })
  export class SharedModule { }
