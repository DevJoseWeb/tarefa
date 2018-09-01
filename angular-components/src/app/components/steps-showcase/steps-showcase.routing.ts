import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StepsShowcaseComponent } from "./steps-showcase.component";

const routes: Routes = [
    {
        path: `steps`,
        component: StepsShowcaseComponent,
        data: {
            routeTitle: "Steps",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StepsShowcaseRouting {}
