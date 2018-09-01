import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DynamicFormShowcaseComponent } from "./dynamic-form-showcase.component";

const routes: Routes = [
    {
        path: `dynamic-form`,
        component: DynamicFormShowcaseComponent,
        data: {
            routeTitle: "Dynamic Form",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DynamicFormShowcaseRouting {}
