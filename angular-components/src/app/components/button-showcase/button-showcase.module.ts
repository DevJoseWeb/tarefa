import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "@seniorsistemas/angular-components";
import { FieldsetModule } from "primeng/fieldset";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";

import { ButtonShowcaseComponent } from "./button-showcase.component";
import { ButtonShowcaseRouting } from "./button-showcase.routing";

@NgModule({
    imports: [CommonModule, PanelModule, TableModule, FieldsetModule, ButtonModule, ButtonShowcaseRouting],
    declarations: [ButtonShowcaseComponent],
})
export class ButtonShowcaseModule {}
