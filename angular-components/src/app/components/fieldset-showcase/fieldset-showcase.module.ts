import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { FieldsetModule } from "primeng/fieldset";
import { DynamicFormModule } from "@seniorsistemas/angular-components";

import { FieldsetShowcaseRouting } from "./fieldset-showcase.routing";
import { FieldsetShowcaseComponent } from "./fieldset-showcase.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelModule, DynamicFormModule, FieldsetModule, FieldsetShowcaseRouting],
    declarations: [FieldsetShowcaseComponent],
})
export class FieldsetShowcaseModule {}
