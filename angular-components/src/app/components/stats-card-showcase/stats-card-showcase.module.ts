import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule, LocaleModule, StatsCardModule } from "@seniorsistemas/angular-components";
import { FieldsetModule } from "primeng/fieldset";
import { InputSwitchModule } from "primeng/inputswitch";
import { PanelModule } from "primeng/panel";

import { StatsCardShowcaseComponent } from "./stats-card-showcase.component";
import { StatsCardShowcaseRouting } from "./stats-card-showcase.routing";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PanelModule,
        FieldsetModule,
        InputSwitchModule,
        ButtonModule,
        LocaleModule.forChild(),
        StatsCardModule,
        StatsCardShowcaseRouting,
    ],
    declarations: [StatsCardShowcaseComponent],
})
export class StatsCardShowcaseModule {}
