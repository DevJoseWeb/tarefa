import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";

import { StatsCardComponent } from "./stats-card.component";

@NgModule({
    imports: [CommonModule, TooltipModule],
    declarations: [StatsCardComponent],
    exports: [StatsCardComponent],
})
export class StatsCardModule {}
