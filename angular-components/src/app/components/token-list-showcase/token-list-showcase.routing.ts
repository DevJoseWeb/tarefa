import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TokenListShowcaseComponent } from "./token-list-showcase.component";

@Component({
    template: `<router-outlet></router-outlet>`,
})
export class EmptyComponent {}

const routes: Routes = [
    {
        path: `token`,
        component: TokenListShowcaseComponent,
        data: {
            routeTitle: "Token",
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [EmptyComponent],
})
export class TokenListShowcaseRouting {}
