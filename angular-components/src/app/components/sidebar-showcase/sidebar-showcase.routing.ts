import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SidebarShowcaseComponent } from "./sidebar-showcase.component";

const routes: Routes = [
    {
        path: "sidebar",
        component: SidebarShowcaseComponent,
        data: {
            routeTitle: "Sidebar",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SidebarShowcaseRouting {}
