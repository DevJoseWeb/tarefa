import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomFieldsShowcaseComponent } from "./custom-fields-showcase.component";

const routes: Routes = [
    {
        path: "custom-fields",
        component: CustomFieldsShowcaseComponent,
        data: {
            routeTitle: "Custom Fields",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomFieldsShowcaseRouting {}
