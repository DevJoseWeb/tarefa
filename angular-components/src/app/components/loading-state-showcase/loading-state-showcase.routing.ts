import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoadingStateShowcaseComponent } from "./loading-state-showcase.component";

const routes: Routes = [
    {
        path: "loading-state",
        component: LoadingStateShowcaseComponent,
        data: {
            routeTitle: "Loading State",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoadingStateShowcaseRouting {}
