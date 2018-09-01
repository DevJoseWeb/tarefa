import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

import { EmptyStateModule } from "@seniorsistemas/angular-components";

import { BreadcrumbShowcaseRouting } from "./breadcrumb-showcase.routing";
import { BreadcrumbShowcaseComponent } from "./breadcrumb-showcase.component";

@NgModule({
    imports: [CommonModule, EmptyStateModule, PanelModule, ButtonModule, TableModule, BreadcrumbShowcaseRouting],
    declarations: [BreadcrumbShowcaseComponent],
})
export class BreadcrumbShowcaseModule {}
