import { Component, Input } from "@angular/core";

@Component({
    selector: 'operacoes-baixas',
    templateUrl: './operacoes-baixas.html'
})

export class OperacoesBaixasComponent {

    public baixaPorPagamento: boolean = true;
    public baixaPorCancelamento: boolean = true;

    @Input() public localeConfig: any;

    constructor() { }

    public onBaixaPorPagamento() {
        this.baixaPorPagamento = true;
    }

    public fecharDialogPagamento(event: boolean) {
        this.baixaPorPagamento = event;
    }

    public onBaixaPorCancelamento() {
        this.baixaPorCancelamento = true;
    }

    public fecharDialogCancelamento(event: boolean) {
       this.baixaPorCancelamento = event;
    }

}
