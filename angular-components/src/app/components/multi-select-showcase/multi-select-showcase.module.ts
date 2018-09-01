import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, ControlErrorsModule } from "@seniorsistemas/angular-components";
import { CheckboxModule } from "primeng/checkbox";
import { MessageService } from "primeng/components/common/messageservice";
import { GrowlModule } from "primeng/growl";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { PanelModule } from "primeng/panel";

import { MultiSelectShowcaseComponent } from "./multi-select-showcase.component";
import { MultiSelectShowcaseRouting } from "./multi-select-showcase.routing";
import { MultiSelectShowcaseService } from "./multi-select-showcase.service";

@NgModule({
    imports: [
        CommonModule,
        GrowlModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        ButtonModule,
        CheckboxModule,
        MultiSelectModule,
        InputTextModule,
        MultiSelectShowcaseRouting,
        ControlErrorsModule,
    ],
    declarations: [MultiSelectShowcaseComponent],
    providers: [MessageService, MultiSelectShowcaseService],
})
export class MultiSelectShowcaseModule {}
