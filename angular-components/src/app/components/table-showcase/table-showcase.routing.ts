import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TableShowcaseComponent } from "./table-showcase.component";
import { DefaultTabComponent } from "./tabs/default/default-tab.component";
import { EditableTabComponent } from "./tabs/editable/editable-tab.component";
import { FrozenTabComponent } from "./tabs/frozen/frozen-tab.component";
import { NestedTabComponent } from "./tabs/nested/nested-tab.component";
import { NoWrapTabComponent } from "./tabs/no-wrap/no-wrap-tab.component";

const routes: Routes = [
    {
        path: `table`,
        component: TableShowcaseComponent,
        data: {
            routeTitle: "Table",
        },
        children: [
            {
                path: "",
                redirectTo: "default",
                pathMatch: "full",
            },
            {
                path: "default",
                component: DefaultTabComponent,
                data: {
                    routeTitle: "Default",
                },
            },
            {
                path: "editable",
                component: EditableTabComponent,
                data: {
                    routeTitle: "Editable",
                },
            },
            {
                path: "frozen",
                component: FrozenTabComponent,
                data: {
                    routeTitle: "Frozen",
                },
            },
            {
                path: "nested",
                component: NestedTabComponent,
                data: {
                    routeTitle: "Nested",
                },
            },
            {
                path: "no-wrap",
                component: NoWrapTabComponent,
                data: {
                    routeTitle: "No Wrap",
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TableShowcaseRouting {}
