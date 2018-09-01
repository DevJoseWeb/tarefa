import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
import { FiltrosServices } from "~src/app/core/entities/filtros/filtros.service";
import { FiltrosServicesTCR } from "~src/app/core/entities/filtros/filtros-tcr.service";
import { FormGroup } from "@angular/forms";
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { ObterTipoTitulo, IObterTipoTitulosOutput, IRecTipoTitulo } from "~src/app/core/models/ObterTipoTitulos";
import { ITransacaoTituloOutput, TransacaoTituloInput } from "~src/app/core/models/TransacaoTitulo";
import { ITransacaoContasReceber } from "~src/app/core/models/TransacaoContasReceber";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";
import { TranslateService } from "@ngx-translate/core";
import { FiltrosServicesTCP } from "~src/app/core/entities/filtros/filtros-tcp.service";
import { ListarFornecedorInput, IRecFornecedor, IListarFornecedorOutput } from "~src/app/core/models/Fornecedor";

@Component({
    templateUrl: "./filtro-titulos-pagar.html",
    selector: "filtro-titulos-pagar"
})

export class FiltroTitulosPagarFeatureComponent implements OnInit {
    public filialOptions: any;
    public filiaisSelecionadas: any[] = [];
    public transacaoTituloOptions: ITransacaoContasReceber;
    public tipoTituloOptions: IRecTipoTitulo;
    public mensagemValidacaoData: string;
    public bloqueiaCaracteres: RegExp = /^[^|'"%`~´@*!]+$/;
    public fornecedorOptions: IRecFornecedor[]; //TODO: IRecFornecedor
    public fornecedorSelecionado: any[] = [];
    public validacaoNumeroTitulo: string;
    public grupoEmpresaId: string;
    public clienteId: number;
    @Input() public localeConfig: any;
    public formGroupValue: FormGroup;
    @Input() public dadosGerais: FormGroup;
    @Output() public formGroupChange: EventEmitter<FormGroup> = new EventEmitter();
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
        private filtrosServiceTcr: FiltrosServicesTCR,
        private filtrosServiceTcp: FiltrosServicesTCP,
        private commonFunctions: CommonFunctions,
        private commonTituloService: CommonTitulosService,
        private translateService: TranslateService,
    ) { }

    public ngOnInit() { }

    public guiaInit() {
        this.obterFiliais();
        this.verificaFornecedores();
        this.obtertransacao();
        this.obterTipoTitulos();
    }

    public obterFiliais() {
        const filiaisGeral = this.commonTituloService.retornaFilialId();
        const params = {
            empresaId: this.dadosGerais.get("empresaId").value,
            pagina: {
                offset: 0,
                limit: 9999
            }
        } 
        
        this.filtrosServiceTcr.obterFilial(params)
            .subscribe(filiais => {
                this.filialOptions = filiais.filiais;
                this.filialOptions.forEach((filial: any, index: any) => {
                    if (filial.id === filiaisGeral[index]) this.filiaisSelecionadas.push(filial.id)
                })
                this.formGroup.get("filialId").setValue(this.filiaisSelecionadas)
            })
    }

    public obterTipoTitulos() {
        const params = new ObterTipoTitulo(
            ["P", "A"],
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
            "CPE",
            "A"
        )

        this.filtrosServiceTcp.listarTransacoesTitulo(params)
            .subscribe(
                (response: ITransacaoTituloOutput) => this.transacaoTituloOptions = response.transacoes ),
                (erro: Error) => this.commonFunctions.errorHandler(erro)
    }

    public verificaFornecedores() {
        let grupoEmpresaId = this.dadosGerais.get("grupoEmpresaId").value;
        let {id} = this.dadosGerais.get("clienteId").value;
        this.obterFornecedor(id, grupoEmpresaId);
    }

    public obterFornecedor(clienteId?: number, grupoEmpresaId?: string) {
        const params = new ListarFornecedorInput(
            clienteId,
            grupoEmpresaId
        )

        this.filtrosServiceTcp.obterFornecedores(params).subscribe((response: any) => {
            this.fornecedorOptions = response.fornecedores;
            if(this.fornecedorOptions.length === 1) {
                this.fornecedorSelecionado.push(this.fornecedorOptions[0])
                this.formGroup.get("fornecedorId").setValue(this.fornecedorSelecionado)
            }
        }, this.commonFunctions.errorHandler.bind(this));
    }

    public verificarData() {
        let dataInicial = this.formGroup.get("dataVencimentoInicial").value;
        let dataFinal = this.formGroup.get("dataVencimentoFinal").value;
        
        this.mensagemValidacaoData = '';
        if(dataInicial > dataFinal) {
            this.mensagemValidacaoData = this.translateService.instant("erp_fin.tcr_baixa.validacao_data_vencimento_inicial_final");
            this.formGroup.setErrors({})
        }
    }

    public verificaNumeroTitulo(numeroTitulo: any) {
        this.validacaoNumeroTitulo = '';
        if(numeroTitulo.value.length > 15) this.validacaoNumeroTitulo = "O número do título não pode possuir mais de 15 caracteres."
    }

    public removeNumeroTitulo() {
        this.validacaoNumeroTitulo = '';
    }
}
