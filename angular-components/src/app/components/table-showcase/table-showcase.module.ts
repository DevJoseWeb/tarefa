import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule, LoadingStateModule, LocaleModule } from "@seniorsistemas/angular-components";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { SelectButtonModule } from "primeng/selectbutton";
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
import { TooltipModule } from "primeng/tooltip";

import { TableShowcaseComponent } from "./table-showcase.component";
import { TableShowcaseRouting } from "./table-showcase.routing";
import { TableShowcaseService } from "./table-showcase.service";
import { DefaultTabComponent } from "./tabs/default/default-tab.component";
import { EditableTabComponent } from "./tabs/editable/editable-tab.component";
import { FrozenTabComponent } from "./tabs/frozen/frozen-tab.component";
import { NestedTabComponent } from "./tabs/nested/nested-tab.component";
import { NoWrapTabComponent } from "./tabs/no-wrap/no-wrap-tab.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabMenuModule,
        TooltipModule,
        CalendarModule,
        SelectButtonModule,
        PanelModule,
        ButtonModule,
        TableModule,
        TableShowcaseRouting,
        InputTextModule,
        AutoCompleteModule,
        LoadingStateModule,
        LocaleModule.forChild(),
    ],
    declarations: [
        TableShowcaseComponent,
        DefaultTabComponent,
        EditableTabComponent,
        FrozenTabComponent,
        NestedTabComponent,
        NoWrapTabComponent,
    ],
    providers: [TableShowcaseService],
})
export class TableShowcaseModule {}
