import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ControlErrorsShowcaseComponent } from "./control-errors-showcase.component";

const routes: Routes = [
    {
        path: `control-errors`,
        component: ControlErrorsShowcaseComponent,
        data: {
            routeTitle: "Control Errors",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ControlErrorsShowcaseRouting {}
