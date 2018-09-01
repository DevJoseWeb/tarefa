import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { ITransacaoContasReceber } from "../../../core/models/TransacaoContasReceber";

@Component({
  templateUrl: "./pagamento-baixas.component.html",
    selector: "pagamento-baixas"
  })

  export class PagamentoBaixaComponent {

    public lookupPagamento: ITransacaoContasReceber;
    public totalDivida: number = 0;
    display: boolean = false;

    @Input() localeConfig: any;

    public onLookupPagamentoBaixa(transacaoContasReceber: string) {
      if (!transacaoContasReceber) {
          return;
      }
    }
}

