import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { IObterTipoTitulosOutput, IRecTipoTitulo, ObterTipoTitulo } from "~core/models/ObterTipoTitulos";
import { TransacaoTituloInput, ITransacaoTituloOutput } from "~core/models/TransacaoTitulo";
import { ITransacaoContasReceber } from "~src/app/core/models/TransacaoContasReceber";
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { FiltrosServices } from "~src/app/core/entities/filtros/filtros.service";
import { ignoreElements } from "rxjs/operators";

@Component({
    selector: "filtro-titulo-receber",
    templateUrl: "./filtro-titulos-receber.html"
})

export class FiltroTitulosReceberFeatureComponent implements OnInit {
    @Input() public dadosGerais: FormGroup;
    @Input() public localeConfig: any;
    public transacaoTituloOptions: ITransacaoContasReceber;
    public tipoTituloOptions: IRecTipoTitulo;
    public mensagemValidacaoData: string;
    public validacaoNumeroTitulo: string;
    public bloqueiaCaracteres: RegExp = /^[^|'"%`~´@*!]+$/;

    @Output() public formGroupChange: EventEmitter< FormGroup > = new EventEmitter();
    public formGroupValue: FormGroup;

    @Input()
    get formGroup() {
        return this.formGroupValue;
    }
    set formGroup(val) {
        this.formGroupValue = val;
        this.formGroupChange.emit(this.formGroupValue);
    }

    constructor(
        private filtrosServices: FiltrosServices,
        private translateService: TranslateService,
        private commonFunctions: CommonFunctions
    ) {}

    public ngOnInit() { }

    public verificarData() {
        let dataInicial = this.formGroup.get("dataVencimentoInicial").value;
        let dataFinal = this.formGroup.get("dataVencimentoFinal").value;
        
        this.mensagemValidacaoData = '';
        if(dataInicial > dataFinal) {
            this.mensagemValidacaoData = this.translateService.instant("erp_fin.tcr_baixa.validacao_data_vencimento_inicial_final");
            this.formGroup.setErrors({})
        }
    }

    public guiaInit() {
        this.obterTipoTitulos();
        this.obtertransacao();
    }

    public obterTipoTitulos() {
        const params = new ObterTipoTitulo(
            ["R", "A"],
            "A",
            ["D", "O"]
        )
        
        this.filtrosServices.listarTipoTitulos(params)
            .subscribe(
                (response: IObterTipoTitulosOutput) => this.tipoTituloOptions = response.tiposTitulos ),
                (erro: Error) => this.commonFunctions.errorHandler(erro)
    }

    public obtertransacao() {
        const params = new TransacaoTituloInput(
            this.dadosGerais.get("empresaId").value,
            1,
            "CRE",
            "A"
        )

        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(
                (response: ITransacaoTituloOutput) => this.transacaoTituloOptions = response.transacoes ),
                (erro: Error) => this.commonFunctions.errorHandler(erro)
    }

    public verificaNumeroTitulo(numeroTitulo: any) {
        this.validacaoNumeroTitulo = '';
        if(numeroTitulo.value.length > 15) return this.validacaoNumeroTitulo = "O número do título não pode possuir mais de 15 caracteres."
    }

    public removeNumeroTitulo() {
        this.validacaoNumeroTitulo = '';
    }

}