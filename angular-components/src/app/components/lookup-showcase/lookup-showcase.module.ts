import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, ControlErrorsModule, LookupModule } from "@seniorsistemas/angular-components";
import { CheckboxModule } from "primeng/checkbox";
import { MessageService } from "primeng/components/common/messageservice";
import { GrowlModule } from "primeng/growl";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { PanelModule } from "primeng/panel";

import { LookupShowcaseComponent } from "./lookup-showcase.component";
import { LookupShowcaseRouting } from "./lookup-showcase.routing";
import { LookupShowcaseService } from "./lookup-showcase.service";

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
        LookupShowcaseRouting,
        LookupModule,
        ControlErrorsModule,
    ],
    declarations: [LookupShowcaseComponent],
    providers: [MessageService, LookupShowcaseService],
})
export class LookupShowcaseModule {}
