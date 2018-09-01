import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabShowcaseComponent } from "./tab-showcase.component";

const routes: Routes = [
    {
        path: `tab`,
        component: TabShowcaseComponent,
        data: {
            routeTitle: "Tab",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabShowcaseRouting {}
