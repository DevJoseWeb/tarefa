import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmptyStateShowcaseComponent } from "./empty-state-showcase.component";

const routes: Routes = [
    {
        path: `empty-state`,
        component: EmptyStateShowcaseComponent,
        data: {
            routeTitle: "Empty State",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmptyStateShowcaseRouting {}
