import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FieldsetShowcaseComponent } from "./fieldset-showcase.component";

const routes: Routes = [
    {
        path: `fieldset`,
        component: FieldsetShowcaseComponent,
        data: {
            routeTitle: "Fieldset",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FieldsetShowcaseRouting {}
