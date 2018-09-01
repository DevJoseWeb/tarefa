import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ControlErrorsComponent } from "./control-errors.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ControlErrorsComponent],
    exports: [ControlErrorsComponent],
})
export class ControlErrorsModule {}
