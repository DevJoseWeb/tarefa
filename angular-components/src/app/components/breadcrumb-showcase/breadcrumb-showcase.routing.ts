import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BreadcrumbShowcaseComponent } from "./breadcrumb-showcase.component";

@Component({
    template: `<router-outlet></router-outlet>`,
})
export class EmptyComponent {}

const routes: Routes = [
    {
        path: `breadcrumb`,
        component: EmptyComponent,
        data: {
            routeTitle: "Rota Principal",
        },
        children: [
            { path: "", component: BreadcrumbShowcaseComponent },
            {
                path: `child`,
                component: EmptyComponent,
                data: {
                    routeTitle: "Rota Filha",
                },
                children: [
                    { path: "", component: BreadcrumbShowcaseComponent },
                    {
                        path: `child`,
                        component: EmptyComponent,
                        data: {
                            routeTitle: "Rota Neta",
                        },
                        children: [
                            { path: "", component: BreadcrumbShowcaseComponent },
                            {
                                path: `child`,
                                component: EmptyComponent,
                                data: {
                                    routeTitle: "Rota Bisneta",
                                },
                                children: [{ path: "", component: BreadcrumbShowcaseComponent }],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [EmptyComponent],
})
export class BreadcrumbShowcaseRouting {}
