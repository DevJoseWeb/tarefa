import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { InputTextModule } from "primeng/inputtext";

import { ControlErrorsModule } from "@seniorsistemas/angular-components";

import { ControlErrorsShowcaseRouting } from "./control-errors-showcase.routing";
import { ControlErrorsShowcaseComponent } from "./control-errors-showcase.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        InputTextModule,
        ControlErrorsShowcaseRouting,
        ControlErrorsModule,
    ],
    declarations: [ControlErrorsShowcaseComponent],
})
export class ControlErrorsShowcaseModule {}
