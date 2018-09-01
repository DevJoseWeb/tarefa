import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, LoadingStateModule } from "@seniorsistemas/angular-components";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PanelModule } from "primeng/panel";
import { TabViewModule } from "primeng/tabview";

@NgModule({
    exports: [
        CommonModule,
        PanelModule,
        TabViewModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        LoadingStateModule,
    ],
})
export class SharedModule {}
