import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ButtonShowcaseComponent } from "./button-showcase.component";

const routes: Routes = [
    {
        path: `button`,
        component: ButtonShowcaseComponent,
        data: {
            routeTitle: "Button",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ButtonShowcaseRouting {}
