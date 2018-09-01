import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FieldType, FormField } from "@seniorsistemas/angular-components";
import { FiltrosServices } from "~src/app/core/entities/filtros/filtros.service";
import { FiltrosServicesTCR } from "~src/app/core/entities/filtros/filtros-tcr.service";
import { FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { IObterClienteOutput, IRecCliente } from "~core/models/Cliente"
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { ObterTipoTitulo, IObterTipoTitulosOutput, IRecTipoTitulo } from "~src/app/core/models/ObterTipoTitulos";
import { ITransacaoTituloOutput, TransacaoTituloInput } from "~src/app/core/models/TransacaoTitulo";
import { ITransacaoContasReceber } from "~src/app/core/models/TransacaoContasReceber";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
    templateUrl: "./creditos.html",
    selector: "filtro-credito"
})

export class FiltroCreditoFeatureComponent implements OnInit {
    public filialOptions: any;
    public filiaisSelecionadas: any[] = [];
    public transacaoTituloOptions: ITransacaoContasReceber;
    public tipoTituloOptions: IRecTipoTitulo;
    public mensagemValidacaoData: string;
    public bloqueiaCaracteres: RegExp = /^[^|'"%`~´@*!]+$/;
    public grupoEmpresaId: string;
    public lookupCliente: IRecCliente;
    public clienteSearchGridData: IRecCliente;
    public clienteSearchTotalRecords: number;
    public validacaoNumeroTitulo: string;
    public clienteSearchFields: FormField[] = [
        new FormField({
            name: "id",
            label: "Código",
            type: FieldType.Integer
        }),
        new FormField({
            name: "nome",
            label: "Nome",
            type: FieldType.String
        }),
        new FormField({
            name: "numeroDocumentoFormatado",
            label: "CPF/CNPJ",
            type: FieldType.Integer
        })
    ];
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
        private commonFunctions: CommonFunctions,
        private commonTituloService: CommonTitulosService,
        private translateService: TranslateService,
    ) { }

    public ngOnInit() { 
        this.obterFiliais();
        this.verificaClientes();
        this.obtertransacaoEntrada();
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
                if (this.filiaisSelecionadas.length > 0) this.filiaisSelecionadas = []
                this.filialOptions.forEach((filial: any, index: any) => {
                    if (filial.id === filiaisGeral[index]) this.filiaisSelecionadas.push(filial.id)
                })
                this.formGroup.get("filialId").setValue(this.filiaisSelecionadas)
            })
    }

    public verificaClientes() {
        this.grupoEmpresaId = this.dadosGerais.get("grupoEmpresaId").value;
        if(this.dadosGerais.get("clienteId").value) 
            this.formGroup.get("clienteId").setValue([this.dadosGerais.get("clienteId").value])
    }

    public obterTipoTitulos() {
        const params = new ObterTipoTitulo(
            ["R", "A"],
            "A",
            ["C"]
        )

        this.filtrosServices.listarTipoTitulos(params)
            .subscribe(
                (response: IObterTipoTitulosOutput) => this.tipoTituloOptions = response.tiposTitulos),
            (erro: Error) => this.commonFunctions.errorHandler(erro)
    }

    public obtertransacaoEntrada() {
        const params = new TransacaoTituloInput(
            this.dadosGerais.get("empresaId").value,
            2,
            "CRE",
            "A"
        )

        this.filtrosServices.listarTransacoesTitulo(params)
            .subscribe(
                (response: ITransacaoTituloOutput) => this.transacaoTituloOptions = response.transacoes),
            (erro: Error) => this.commonFunctions.errorHandler(erro)
    }

    public obterTipoCliente(event: any, lookup?: boolean) {
        if (this.grupoEmpresaId) {
            const service = this.filtrosServices;
            if (!lookup) this.obterCliente(event, service, this.grupoEmpresaId)
            this.obterClienteLookup(event, service, this.grupoEmpresaId)
            return;
        }

        const service = this.filtrosServiceTcr;
        if (!lookup) this.obterCliente(event, service)
        this.obterClienteLookup(event, service)
        return;
    }

    public obterClienteLookup(cliente: string, service: any, grupoEmpresaId?: string) {
        if (!cliente) {
            return;
        }

        const params = {
            termoBusca: cliente,
            grupoId: grupoEmpresaId ? grupoEmpresaId : null,
            pagina: {
                limit: 50, offset: 0
            }
        }

        service.obterClientes(params)
            .pipe(debounceTime(500))
            .subscribe((response: IObterClienteOutput) => {
                this.lookupCliente = response.clientes;
            }, this.commonFunctions.errorHandler.bind(this));
    }

    public obterCliente(event: any, service: any, grupoEmpresaId?: string) {
        const { first, rows, filterData, multiSortMeta = [] } = event;
        const page = first / rows;

        filterData.clienteId = filterData.id;
        filterData.numeroDocumento = filterData.numeroDocumentoFormatado;
        if (grupoEmpresaId) filterData.grupoId = grupoEmpresaId;

        const params = {
            ...filterData,
            pagina: {
                offset: page,
                limit: 10,
                listaOrdenacao: multiSortMeta ? multiSortMeta.map((sort: any) => {
                    return {
                        campo: sort.field === "numeroDocumentoFormatado" ? "numeroDocumento" : sort.field,
                        ordenacao: sort.order < 0 ? "Asc" : "Desc"
                    };
                }) : []
            }
        }

        service.obterClientes(params)
            .subscribe((response: IObterClienteOutput) => {
                this.clienteSearchGridData = response.clientes;
                this.clienteSearchTotalRecords = response.totalRegistros;
                
            }, this.commonFunctions.errorHandler.bind(this));
    }

    public verificarData() {
        let dataInicial = this.formGroup.get("dataVencimentoInicial").value;
        let dataFinal = this.formGroup.get("dataVencimentoFinal").value;

        this.mensagemValidacaoData = '';
        if ((dataInicial && dataFinal) && (dataInicial > dataFinal)) {
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
