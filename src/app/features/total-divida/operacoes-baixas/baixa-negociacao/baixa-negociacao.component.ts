import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { OperacoesBaixasService } from "~src/app/core/entities/operacoes-baixas/operacoes-baixas.service";
import { FiltrosServicesTCP } from "~src/app/core/entities/filtros/filtros-tcp.service";
import { FiltrosServicesTCR } from "~src/app/core/entities/filtros/filtros-tcr.service";
import * as moment from "moment";
import { FiltrosServices } from "~src/app/core/entities/filtros/filtros.service";
import { TransacaoEntradaTituloInput } from "~src/app/core/models/TransacaoEntradaTitulo";
import { TransacaoTesouraria } from "~src/app/core/models/TransacaoTesouraria";
import { ListarContaInterna } from "~src/app/core/models/ListarContaInterna";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";

import { IObterClienteOutput, IRecCliente } from "~core/models/Cliente";
import { FiltroGeralFeatureComponent } from "~features/total-divida/filtros/geral/filtro-geral.component";

@Component({
    selector: "baixa-negociacao",
    templateUrl: "./baixa-negociacao.html",
    styles: ['/.baixa-negociacao.scss']
})

export class BaixaNegociacaoComponent implements OnInit {
    public formGroup: FormGroup;

    public transacaoBaixaPagamentoOptions: any;
    public transacaoBaixaSubstituicaoOptions: any;
    public transacaoBaixaDuplicataOptions: any;
    public transacaoBaixaCreditoOptions: any;
    public transacaoBaixaCompensacaoReceberOptions: any;
    public transacaoBaixaCompensacaoPagarOptions: any;
    public transacaoMovimentoOptions: any;
    public transacaoBaixaTransacaoEntradaOptions: any;
    public transacaoBaixaTransacaoEntradaSubstituicaoOptions: any;
    public contaInternaOptions: any;
    public contaInternaTrocoOptions: any;
    public transacaoMovimentoTrocoOptions: any;

    public mensagemVerificaDatabaixa: boolean = true;
    public mostraCampoAdicional: boolean = true;
    public valorDivida: any;
    public empresaId: number;
    public filialProcessamentoId: number;
    public filialId: number[] = [];

    //public clienteOptions: any = 

    @Input() public localeConfig: any;
    @Output() public fecharDialog: EventEmitter<boolean> = new EventEmitter;

    constructor(
        private translateService: TranslateService,
        private formBuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private operacoesBaixasService: OperacoesBaixasService,
        private filtrosServices: FiltrosServices,
        private commonFunctions: CommonFunctions,
        private commonTituloService: CommonTitulosService,
        private filtrosServiceTcp: FiltrosServicesTCP,
        private filtrosServiceTcr: FiltrosServicesTCR,
    ) {
        this.valorDivida = this.commonTituloService.valorDivida;
        this.empresaId = this.commonTituloService.empresaId;
        this.filialId = this.commonTituloService.filiaisId;
        this.filialProcessamentoId = this.commonTituloService.filialProcessamentoId;
    }

    public ngOnInit() {

        this.createForm();

        this.obterTransacaoBaixaPagamento();
        this.obterTransacaoMovimento();
        this.obterTransacaoBaixaSubstituicao();
        this.obterTransacaoBaixaTransacaoSubstituicaoEntrada();
        this.obterTransacaoBaixaDuplicata();
        this.obterTransacaoBaixaCredito();
        this.obterTransacaoBaixaCompensacaoReceber();
        this.obterTransacaoBaixaCompensacaoPagar();

        this.obterContaInterna();
        this.transacaoMovimentoTroco();
        this.alteraValorBaixar();

    }

    public createForm() {
        this.formGroup = this.formBuilder.group({
            dataBaixa: [moment().toDate(), Validators.required],
            transacaoBaixaPagamento: ['', Validators.required],
            transacaoMovimento: ['', Validators.required],
            contaInterna: ['', Validators.required],
            valorBaixar: [this.valorDivida],
            contaInternaTroco: [''],
            transacaoMovimentoTroco: ['', Validators.required],
            //Baixas por substituição
            transacaoMovimentoSubstituicao: ['', Validators.required],
            transacaoBaixaTransacaoEntradaSubistuicao: ['', Validators.required]
        });
    }

    /*Baixas por pagamento
    */
    public alteraValorBaixar() {
        this.formGroup.controls.valorBaixar.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(500)
            )
            .subscribe(valor => {
                if (valor > this.valorDivida) {
                    this.mostraCampoAdicional = false;
                } else if (valor <= this.valorDivida) {
                    this.mostraCampoAdicional = true;
                    this.formGroup.get("contaInternaTroco").reset();
                    this.formGroup.get("transacaoMovimentoTroco").reset();
                    //this.contaInternaTrocoOptions = [];
                    //this.transacaoMovimentoTrocoOptions = [];
                }
            });
    }

    public obterTransacaoBaixaPagamento() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
            3,
            "CRB",
            "PG",
            "A"
        );

        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(response => this.transacaoBaixaPagamentoOptions = response.transacoes);
    }

    public obterTransacaoMovimento() {
        const params = new TransacaoTesouraria(
            this.empresaId,
            "A",
            "CBM",
            "C",
            null,
            "S",
        );

        this.operacoesBaixasService.listarTransacaoTesouraria(params)
            .subscribe(response => this.transacaoMovimentoOptions = response.transacoesTesouraria);
    }

    public transacaoMovimentoTroco() {
        const params = new TransacaoTesouraria(
            this.empresaId,
            "A",
            "CBM",
            "D",
            null,
            "S",
        );

        this.operacoesBaixasService.listarTransacaoTesouraria(params)
            .subscribe(response => this.transacaoMovimentoTrocoOptions = response.transacoesTesouraria);
    }

    public obterContaInterna() {
        const params = new ListarContaInterna(
            this.empresaId,
            this.filialId,
            [1, 2, 9, 10]
        );

        this.operacoesBaixasService.listarContaInternaAtiva(params)
            .subscribe(response => {
                this.contaInternaOptions = response.contasInternas;
                this.contaInternaTrocoOptions = response.contasInternas;
            });
    }

    public verificarDataBaixa() {
        const params = {
            filialProcessamentoId: this.filialProcessamentoId,
            dataBaixa: this.commonFunctions.converterData(this.formGroup.value.dataBaixa)
        };

        this.filtrosServices.verificarDataBaixa(params)
            .subscribe((response: any) => this.mensagemVerificaDatabaixa = response.dataValida);
    }
    /*Baixas por substituições
    */
    public obterTransacaoBaixaSubstituicao() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
            3,
            "CRB",
            "SU",
            "A"
        );

        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(response => this.transacaoBaixaSubstituicaoOptions = response.transacoes);
    }

    public obterTransacaoBaixaTransacaoSubstituicaoEntrada() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
            1,
            "CRE",
            "NA",
            "A"
        );

        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(response => this.transacaoBaixaTransacaoEntradaSubstituicaoOptions = response.transacoes);
    }

    public obterTransacaoBaixaCliente() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
        );
    }

    /*Baixas por crédito
    */
    public obterTransacaoBaixaDuplicata() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
            3,
            "CRB",
            "CR",
            "A"
        );
        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(response => this.transacaoBaixaDuplicataOptions = response.transacoes);
    }

    public obterTransacaoBaixaCredito() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
            4,
            "CRB",
            "CR",
            "A"
        );
        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(response => this.transacaoBaixaCreditoOptions = response.transacoes);
    }

    /*Baixas por compensação
    */
    public obterTransacaoBaixaCompensacaoReceber() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
            3,
            "CRB",
            "CP",
            "A"
        );
        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(response => this.transacaoBaixaCompensacaoReceberOptions = response.transacoes);
    }
    //TODO: verificar se é TCP
    public obterTransacaoBaixaCompensacaoPagar() {
        const params = new TransacaoEntradaTituloInput(
            this.empresaId,
            3,
            "CBP",
            "CP",
            "A"
        );
        this.filtrosServiceTcp.listarTransacoesTitulo(params)
            .subscribe(response => this.transacaoBaixaCompensacaoPagarOptions = response.transacoes);
    }
    public btnVisualizar() { }

    public btnCancelar() {
        this.formGroup.reset();
        this.ngOnInit();
        this.fecharDialog.emit(false);
    }
}
