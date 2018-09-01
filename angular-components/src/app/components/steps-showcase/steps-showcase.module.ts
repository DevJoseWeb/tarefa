import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule, StepsModule } from "@seniorsistemas/angular-components";
import { DropdownModule } from "primeng/dropdown";
import { InputSwitchModule } from "primeng/inputswitch";
import { PanelModule } from "primeng/panel";

import { StepsShowcaseComponent } from "./steps-showcase.component";
import { StepsShowcaseRouting } from "./steps-showcase.routing";

@NgModule({
    imports: [CommonModule, FormsModule, PanelModule, DropdownModule, InputSwitchModule, ButtonModule, StepsModule, StepsShowcaseRouting],
    declarations: [StepsShowcaseComponent],
})
export class StepsShowcaseModule {}
