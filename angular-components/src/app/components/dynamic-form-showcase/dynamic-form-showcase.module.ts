import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { GrowlModule } from "primeng/growl";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessageService } from "primeng/components/common/messageservice";

import { DynamicFormModule, ButtonModule } from "@seniorsistemas/angular-components";

import { DynamicFormShowcaseRouting } from "./dynamic-form-showcase.routing";
import { DynamicFormShowcaseComponent } from "./dynamic-form-showcase.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        GrowlModule,
        InputTextareaModule,
        DynamicFormShowcaseRouting,
        DynamicFormModule,
    ],
    declarations: [DynamicFormShowcaseComponent],
    providers: [MessageService],
})
export class DynamicFormShowcaseModule {}
