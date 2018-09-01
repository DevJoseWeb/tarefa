import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ButtonModule } from "../button/index";
import { EmptyStateComponent } from "./empty-state.component";

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [EmptyStateComponent],
    exports: [EmptyStateComponent],
})
export class EmptyStateModule {}
