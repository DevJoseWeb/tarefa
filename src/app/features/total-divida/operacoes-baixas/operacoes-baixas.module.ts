import { NgModule } from "@angular/core";
import { LocaleModule } from "@seniorsistemas/angular-components";
import { SharedModule } from "~src/app/shared/shared.module";
import { OperacoesBaixasComponent } from "~src/app/features/total-divida/operacoes-baixas/operacoes-baixas.component";
import { BaixaPagamentoComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-pagamento/baixa-pagamento.component";
import { BaixaCancelamentoComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-cancelamento/baixa-cancelamento.component";
import { BaixaAbatimentoComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-abatimento/baixa-abatimento.component";
import { BaixaNegociacaoComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-negociacao/baixa-negociacao.component";
import { BaixaLucroPerdaComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-lucroperda/baixa-lucroperda.component";
import { BaixaDevolucaoComponent } from "~src/app/features/total-divida/operacoes-baixas/baixa-devolucao/baixa-devolucao.component";

@NgModule({
    imports: [ LocaleModule.forChild(), SharedModule ],
    exports: [ OperacoesBaixasComponent],
    declarations: [
        OperacoesBaixasComponent,
        BaixaPagamentoComponent,
        BaixaCancelamentoComponent,
        BaixaAbatimentoComponent,
        BaixaNegociacaoComponent,
        BaixaLucroPerdaComponent,
        BaixaDevolucaoComponent
    ]
})

export class OperacoesBaixasModule {}
