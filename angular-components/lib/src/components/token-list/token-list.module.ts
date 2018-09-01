import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TokenListComponent } from "./token-list.component";

@NgModule({
    imports: [CommonModule],
    declarations: [TokenListComponent],
    exports: [TokenListComponent],
})
export class TokenListModule {}
