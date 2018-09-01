import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpInterceptorModule } from "../http-interceptor/index";
import { LocaleModule } from "../locale/index";
import { DynamicFormModule } from "../dynamic-form/index";

import { CustomFieldsComponent } from "./custom-fields.component";
import { CustomFieldsService } from "./custom-fields.service";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpInterceptorModule, LocaleModule, DynamicFormModule],
    declarations: [CustomFieldsComponent],
    exports: [CustomFieldsComponent],
    providers: [CustomFieldsService],
})
export class CustomFieldsModule {}
