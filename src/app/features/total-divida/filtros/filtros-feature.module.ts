import { NgModule } from "@angular/core";
import { SharedModule } from "~src/app/shared/shared.module";

import { FiltrosFeatureComponent } from "./filtros-feature.component";
import { FiltroGeralFeatureComponent } from "./geral/filtro-geral.component";
import { FiltroTitulosReceberFeatureComponent } from "./titulos-receber/filtro-titulos-receber.component";
import { FiltroCreditoFeatureComponent } from "~src/app/features/total-divida/filtros/creditos/creditos.component";
import { FiltroTitulosPagarFeatureComponent } from "~src/app/features/total-divida/filtros/titulos-pagar/filtro-titulos-pagar.component";

@NgModule({
    imports: [ SharedModule ],
    exports: [ FiltrosFeatureComponent ],
    declarations: [
        FiltrosFeatureComponent,
        FiltroGeralFeatureComponent,
        FiltroTitulosReceberFeatureComponent,
        FiltroCreditoFeatureComponent,
        FiltroTitulosPagarFeatureComponent
    ],

})

export class FiltrosFeatureModule {}
