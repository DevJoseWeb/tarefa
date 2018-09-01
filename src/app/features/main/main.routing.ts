import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { of } from "rxjs";

import { environment } from "~src/environments/environment";
import { MainComponent } from "~src/app/features/main/main.component";

export class TitleResolver {
    public resolve() {
        return of(`${environment.name} (${environment.version})`);
    }
}

export const routes: Routes = [
    {
        path: "main",
        component: MainComponent,
        resolve: {
            routeTitle: TitleResolver,
        },
    },
    {
        path: "",
        redirectTo: "/main",
        pathMatch: "full",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [TitleResolver],
})
export class MainRouting {}
