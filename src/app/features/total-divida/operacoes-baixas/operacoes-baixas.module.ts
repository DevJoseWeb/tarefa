import { NgModule } from "@angular/core";
import { LocaleModule } from "@seniorsistemas/angular-components";
import { SharedModule } from "~src/app/shared/shared.module";
import { OperacoesBaixasComponent } from "~src/app/features/total-divida/operacoes-baixas/operacoes-baixas.component";
import { BaixaPagamentoComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-pagamento/baixa-pagamento.component";
import { BaixaCancelamentoComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-cancelamento/baixa-cancelamento.component";

@NgModule({
    imports: [ LocaleModule.forChild(), SharedModule ],
    exports: [ OperacoesBaixasComponent ],
    declarations: [
        OperacoesBaixasComponent,
        BaixaPagamentoComponent,
        BaixaCancelamentoComponent
    ]
})

export class OperacoesBaixasModule {}
