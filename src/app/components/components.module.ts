import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AutoCompleteModule, CalendarModule, PanelModule, DataTableModule, DialogModule, SharedModule, SpinnerModule, SplitButtonModule } from 'primeng/primeng';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CompanySelectModule } from '~src/app/components/company-select/company-select.module';

@NgModule({
    imports: [
        AutoCompleteModule,
        FormsModule,
        PanelModule,
        CommonModule,
        CalendarModule,
        DialogModule,
        DataTableModule,
        SharedModule,
        SpinnerModule,
        TranslateModule,
        SplitButtonModule,
        CompanySelectModule,
    ],
    declarations: [
    ],
    exports: [
        CompanySelectModule
    ],
    providers: [
    ]
})
export class ComponentModule {};