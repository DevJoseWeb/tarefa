import { Component, Input } from "@angular/core";

@Component({
    selector: 'operacoes-baixas',
    templateUrl: './operacoes-baixas.html'
})

export class OperacoesBaixasComponent {

    public baixaPorPagamento: boolean = false;
    public baixaPorCancelamento: boolean = false;
    public baixaPorAbatimetno: boolean = false;
    public baixaPorNegociacao: boolean = false;
    public baixaPorLucroPerda: boolean = false;
    public baixaPorDevolucao: boolean = false;

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

    public onBaixaPorAbatimento() {
        this.baixaPorAbatimetno = true;
    }

    public fecharDialogAbatimento(event: boolean) {
       this.baixaPorAbatimetno = event;
    }

    public onBaixaPorNegociacao() {
        this.baixaPorNegociacao = true;
    }

    public fecharDialogNegociacao(event: boolean) {
       this.baixaPorNegociacao = event;
    }

    public onBaixaPorLucroPerda() {
        this.baixaPorLucroPerda = true;
    }

    public fecharDialogLucroPerda(event: boolean) {
       this.baixaPorLucroPerda = event;
    }

    public onBaixaPorDevolucao() {
        this.baixaPorDevolucao = true;
    }

    public fecharDialogDevolucao(event: boolean) {
       this.baixaPorDevolucao = event;
    }
}
