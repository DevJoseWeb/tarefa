import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbModule as PrimeBreadcrumbModule } from "primeng/breadcrumb";

import { BreadcrumbComponent } from "./breadcrumb.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, PrimeBreadcrumbModule, RouterModule],
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent, RouterModule],
})
export class BreadcrumbModule {}
