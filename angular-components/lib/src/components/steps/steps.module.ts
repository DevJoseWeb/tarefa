import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";

import { StepsComponent } from "./steps.component";

@NgModule({
    imports: [CommonModule, TooltipModule],
    declarations: [StepsComponent],
    exports: [StepsComponent],
})
export class StepsModule {}
