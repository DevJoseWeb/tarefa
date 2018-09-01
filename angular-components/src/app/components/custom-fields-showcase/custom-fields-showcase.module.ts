import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { GrowlModule } from "primeng/growl";
import { MessageService } from "primeng/components/common/messageservice";

import { CustomFieldsService, CustomFieldsModule, EmptyStateModule, ButtonModule } from "@seniorsistemas/angular-components";

import { CustomFieldsShowcaseRouting } from "./custom-fields-showcase.routing";
import { CustomFieldsShowcaseComponent } from "./custom-fields-showcase.component";
import { CustomFieldsShowcaseService } from "./custom-fields-showcase.service";

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
        CustomFieldsShowcaseRouting,
        CustomFieldsModule,
        EmptyStateModule,
    ],
    declarations: [CustomFieldsShowcaseComponent],
    providers: [
        MessageService,
        {
            provide: CustomFieldsService,
            useClass: CustomFieldsShowcaseService,
        },
    ],
})
export class CustomFieldsShowcaseModule {}
