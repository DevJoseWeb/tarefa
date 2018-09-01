import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TooltipModule } from "primeng/tooltip";

import { ButtonComponent } from "./button.component";

@NgModule({
    imports: [CommonModule, RouterModule, TieredMenuModule, TooltipModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class ButtonModule {}
