import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LookupShowcaseComponent } from "./lookup-showcase.component";

const routes: Routes = [
    {
        path: "lookup",
        component: LookupShowcaseComponent,
        data: {
            routeTitle: "Lookup",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LookupShowcaseRouting {}
