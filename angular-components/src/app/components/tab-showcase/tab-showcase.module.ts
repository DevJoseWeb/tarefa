import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { SelectButtonModule } from "primeng/selectbutton";
import { TabViewModule } from "primeng/tabview";
import { TabMenuModule } from "primeng/tabmenu";

import { TabShowcaseRouting } from "./tab-showcase.routing";
import { TabShowcaseComponent } from "./tab-showcase.component";

@NgModule({
    imports: [CommonModule, FormsModule, PanelModule, SelectButtonModule, TabViewModule, TabMenuModule, TabShowcaseRouting],
    declarations: [TabShowcaseComponent],
})
export class TabShowcaseModule {}
