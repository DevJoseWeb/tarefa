import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainModule } from "~src/app/features/main/main.module";

export const routes: Routes = [
    {
        path: "",
        loadChildren: "~features/total-divida/total-divida-feature.module#TotalDividaFeatureModule",
    },
];

@NgModule({
    imports: [MainModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesModule {}
