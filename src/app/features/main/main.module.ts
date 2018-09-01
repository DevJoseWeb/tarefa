import { NgModule } from "@angular/core";

import { SharedModule } from "~src/app/shared/shared.module";
import { MainRouting } from "~src/app/features/main/main.routing";
import { MainComponent } from "~src/app/features/main/main.component";

@NgModule({
    imports: [SharedModule, MainRouting],
    declarations: [MainComponent],
})
export class MainModule {}
