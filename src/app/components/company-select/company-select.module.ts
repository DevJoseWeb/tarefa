import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MultiselectComponent } from '~src/app/components/company-select/multiselect/multiselect.component';
import { MultiselectService } from '~src/app/components/company-select/multiselect/multiselect.service';
import { SingleSelectComponent } from '~src/app/components/company-select/single-select/single-select.component';
import { SingleSelectService } from '~src/app/components/company-select/single-select/single-select.service';
import { CompanySelectComponent } from '~src/app/components/company-select/company-select.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        MultiselectComponent,
        SingleSelectComponent,
        CompanySelectComponent
    ],
    exports: [
        MultiselectComponent,
        SingleSelectComponent,
        CompanySelectComponent
    ],
    providers: [
        MultiselectService,
        SingleSelectService
    ]
})
export class CompanySelectModule {};