import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StatsCardShowcaseComponent } from "./stats-card-showcase.component";

const routes: Routes = [
    {
        path: `stats-card`,
        component: StatsCardShowcaseComponent,
        data: {
            routeTitle: "Stats Card",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StatsCardShowcaseRouting {}
