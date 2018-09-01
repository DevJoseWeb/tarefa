import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { GrowlModule } from "primeng/growl";

import { TokenListModule, DynamicFormModule, ButtonModule } from "@seniorsistemas/angular-components";

import { TokenListShowcaseRouting } from "./token-list-showcase.routing";
import { TokenListShowcaseComponent } from "./token-list-showcase.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        ButtonModule,
        GrowlModule,
        TokenListShowcaseRouting,
        TokenListModule,
        DynamicFormModule,
    ],
    declarations: [TokenListShowcaseComponent],
})
export class TokenListShowcaseModule {}
