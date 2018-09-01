import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SidebarModule as PrimeSidebar } from "primeng/sidebar";

import { StructureModule } from "../structure/structure.module";
import { SidebarComponent } from "./sidebar.component";

@NgModule({
    imports: [CommonModule, PrimeSidebar, ScrollPanelModule, StructureModule],
    declarations: [SidebarComponent],
    exports: [StructureModule, SidebarComponent],
})
export class SidebarModule {}
