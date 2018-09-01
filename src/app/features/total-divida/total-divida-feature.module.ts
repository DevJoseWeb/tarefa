import { NgModule } from "@angular/core";
import { LocaleModule } from "@seniorsistemas/angular-components";
import { environment } from "~environments/environment";
import { SharedModule } from "~src/app/shared/shared.module";
import { TotalDividaFeatureRouting } from "~src/app/features/total-divida/total-divida-feature.routing";
import { TotalDividaFeatureComponent } from "~src/app/features/total-divida/total-divida-feature.component";
import { TotalizadorFeatureComponent } from "~src/app/features/total-divida/totalizador/totalizador-feature.component";

import { FiltrosFeatureModule } from "~src/app/features/total-divida/filtros/filtros-feature.module";
import { OperacoesBaixasModule } from "~src/app/features/total-divida/operacoes-baixas/operacoes-baixas.module";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";

/**
 * Fix para empresa e filial usar informações locais
 */
import { RestUrl } from "@seniorsistemas/angular-components";
import { of } from "rxjs";
export class CustomRestUrl {
    get() {
        return of(environment.restUrl);
    }
}

@NgModule({
    imports: [LocaleModule.forChild(), SharedModule, TotalDividaFeatureRouting, FiltrosFeatureModule, OperacoesBaixasModule],
    declarations: [
        TotalDividaFeatureComponent,
        TotalizadorFeatureComponent
    ],
    providers: [
        CommonTitulosService,
        { provide: RestUrl, useFactory: () => (!environment.production && environment.restUrl ? new CustomRestUrl() : new RestUrl()) }
    ]
})
export class TotalDividaFeatureModule {}
