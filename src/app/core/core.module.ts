import { NgModule } from '@angular/core';

import { FiltrosModule } from '~src/app/core/entities/filtros/filtros.module';
import { TotalizadorModule } from '~src/app/core/entities/totalizador/totalizador-feature.module';
import { OperacoesBaixasModule } from '~src/app/core/entities/operacoes-baixas/operacoes-baixas.module';

@NgModule({
    imports: [
        FiltrosModule,
        TotalizadorModule,
        OperacoesBaixasModule
    ],
})
export class CoreModule {}
