import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";

import { EmptyStateModule, ButtonModule } from "@seniorsistemas/angular-components";

import { EmptyStateShowcaseRouting } from "./empty-state-showcase.routing";
import { EmptyStateShowcaseComponent } from "./empty-state-showcase.component";

@NgModule({
    imports: [CommonModule, PanelModule, ButtonModule, TableModule, EmptyStateShowcaseRouting, EmptyStateModule],
    declarations: [EmptyStateShowcaseComponent],
})
export class EmptyStateShowcaseModule {}
