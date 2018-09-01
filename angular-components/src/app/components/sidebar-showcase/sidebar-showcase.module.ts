import { NgModule } from "@angular/core";
import { SidebarModule } from "@seniorsistemas/angular-components";

import { SharedModule } from "../../shared/shared.module";
import { SidebarShowcaseComponent } from "./sidebar-showcase.component";
import { SidebarShowcaseRouting } from "./sidebar-showcase.routing";

@NgModule({
    imports: [SidebarModule, SidebarShowcaseRouting, SharedModule],
    declarations: [SidebarShowcaseComponent],
})
export class SidebarShowcaseModule {}
