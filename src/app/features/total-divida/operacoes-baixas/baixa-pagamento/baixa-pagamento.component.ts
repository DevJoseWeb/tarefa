import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { OperacoesBaixasService } from "~src/app/core/entities/operacoes-baixas/operacoes-baixas.service";
import * as moment from "moment";
import { FiltrosServices } from "~src/app/core/entities/filtros/filtros.service";
import { TransacaoEntradaTituloInput } from "~src/app/core/models/TransacaoEntradaTitulo";
import { TransacaoTesouraria } from "~src/app/core/models/TransacaoTesouraria";
import { ListarContaInterna } from "~src/app/core/models/ListarContaInterna";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";

@Component({
    selector: "baixa-pagamento",
    templateUrl: "./baixa-pagamento.html"
})

export class BaixaPagamentoComponent implements OnInit {
    public formGroup: FormGroup;
    public transacaoBaixaPagamentoOptions: any;
    public transacaoMovimentoOptions: any;
    public contaInternaOptions: any;
    public contaInternaTrocoOptions: any;
    public transacaoMovimentoTrocoOptions: any;
    public mensagemVerificaDatabaixa: boolean = true;
    public mostraCampoAdicional: boolean = true;
    public valorDivida: any;
    public empresaId: number;
    public filialProcessamentoId: number;
    public filialId: number[] = [];
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
        private commonTituloService: CommonTitulosService
    ) {
        this.valorDivida = this.commonTituloService.valorDivida;
        this.empresaId = this.commonTituloService.empresaId;
        this.filialId = this.commonTituloService.filiaisId;
        this.filialProcessamentoId = this.commonTituloService.filialProcessamentoId;
    }

    public ngOnInit() {
        this.createForm();

        this.obterContaInterna();

        this.obterTransacaoBaixaPagamento();
        this.obterTransacaoMovimento();

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
            transacaoMovimentoTroco: ['', Validators.required]
        });
    }

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
                    this.contaInternaTrocoOptions = [];
                    this.transacaoMovimentoTrocoOptions = [];
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

    public btnVisualizar() { }

    public btnCancelar() {

        this.formGroup.reset();
        this.ngOnInit();
        this.fecharDialog.emit(false);

    }
}
