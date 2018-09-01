import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule, EmptyStateModule, LoadingStateModule } from "@seniorsistemas/angular-components";
import { InputSwitchModule } from "primeng/inputswitch";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";

import { LoadingStateShowcaseComponent } from "./loading-state-showcase.component";
import { LoadingStateShowcaseRouting } from "./loading-state-showcase.routing";
import { LoadingStateShowcaseService } from "./loading-state-showcase.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PanelModule,
        TableModule,
        InputSwitchModule,
        ButtonModule,
        LoadingStateModule,
        EmptyStateModule,
        LoadingStateShowcaseRouting,
    ],
    declarations: [LoadingStateShowcaseComponent],
    providers: [LoadingStateShowcaseService],
})
export class LoadingStateShowcaseModule {}
