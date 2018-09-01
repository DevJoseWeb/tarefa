import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MultiSelectShowcaseComponent } from "./multi-select-showcase.component";

const routes: Routes = [
    {
        path: "multi-select",
        component: MultiSelectShowcaseComponent,
        data: {
            routeTitle: "MultiSelect",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MultiSelectShowcaseRouting {}
