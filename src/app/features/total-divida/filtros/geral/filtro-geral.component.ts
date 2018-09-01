import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FieldType, FormField } from "@seniorsistemas/angular-components";
import { FiltrosServices } from "~src/app/core/entities/filtros/filtros.service";
import { FiltrosServicesTCR } from "~src/app/core/entities/filtros/filtros-tcr.service";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/components/common/messageservice";
import { debounceTime } from "rxjs/operators";
import { SelectItem } from "primeng/api";
import { FormGroup } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import * as moment from "moment";

import { IObterClienteOutput, IRecCliente } from "~core/models/Cliente"
import { IListarGrupoEmpresaOutput, IGruposEmpresas } from "~core/models/GrupoEmpresa"
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";

@Component({
    templateUrl: "./filtro-geral.html",
    selector: "filtro-geral"
})

export class FiltroGeralFeatureComponent implements OnInit {

    public empresaId: any;
    public filialId: any;
    public unselectedEmpresasSM: any[] = [];
    public unselectedFiliaisSM: any[] = [];
    public filialIdProcessamentoOptions: any; //TODO: IRecFilial
    public formaPagamentoIdOptions: SelectItem[];
    public itemsPerPage: number = 10;
    public mensagemValidacaoData: boolean;
    public mensagemVerificaDatabaixa: boolean = true;
    public grupoEmpresaIdOptions: IGruposEmpresas;
    public lookupCliente: IRecCliente;
    public clienteSearchGridData: IRecCliente;
    public clienteSearchTotalRecords: number;
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

    @Input() localeConfig: any;
    @Output() public formGroupChange: EventEmitter<FormGroup> = new EventEmitter();
    public formGroupValue: FormGroup;
    @Input()
    get formGroup() {
        return this.formGroupValue;
    }
    set formGroup(val) {
        this.formGroupValue = val;
        this.formGroupChange.emit(this.formGroupValue);
    }

    display: boolean = false;

    constructor(
        private filtrosService: FiltrosServices,
        private filtrosServiceTcr: FiltrosServicesTCR,
        private translateService: TranslateService,
        private confirmationService: ConfirmationService,
        private commonTituloService: CommonTitulosService,
        private commonFunctions: CommonFunctions
    ) { }

    public ngOnInit() {
        const empresaFilialStorage = JSON.parse(localStorage.getItem('erp_fin/tcr_baixa/total-divida'))
        if (empresaFilialStorage) {
            this.empresaId = empresaFilialStorage.company;
            this.filialId = empresaFilialStorage.subCompany;
            this.enviaValorEmpresa();
            this.enviaValorFilial();
        }

        this.obterGrupoEmpresa();
        this.formGroup.get("empresaId").valueChanges.subscribe(empresaId => this.empresaId = empresaId)
    }

    public enviaValorEmpresa() {
        this.commonTituloService.enviaEmpresaId(this.empresaId);
        this.formGroup.get("empresaId").setValue(this.empresaId);
        this.obterFormasPagamento();
        this.obterFiliais();
    }

    public enviaValorFilial() {
        this.commonTituloService.enviaFilialId(this.filialId);
        this.formGroup.get("filialId").setValue(this.filialId);
    }

    public obterGrupoEmpresa() {
        this.filtrosService.listarGrupoEmpresa()
            .subscribe((response: IListarGrupoEmpresaOutput) => {
            this.grupoEmpresaIdOptions = response.gruposEmpresas;
        }, this.commonFunctions.errorHandler.bind(this));
    }

    public obterFiliais() {
        const params = {
            empresaId: this.empresaId,
            pagina: {
                offset: 0,
                limit: 9999
            }
        } 
        
        this.filtrosServiceTcr.obterFilial(params)
            .subscribe(res => {
                this.filialIdProcessamentoOptions = res.filiais;
            })
    }

    public limpaCliente() {
        this.formGroup.get("clienteId").reset();
        this.clienteSearchGridData = null;
    }

    public obterTipoCliente(event: any, lookup?: boolean) {
        const grupoEmpresaId = this.formGroup.get("grupoEmpresaId").value;
        if(grupoEmpresaId) {
            const service = this.filtrosService;
            if(!lookup) this.obterCliente(event, service, grupoEmpresaId)
            this.obterClienteLookup(event, service, grupoEmpresaId)
            return;
        }
        
        const service = this.filtrosServiceTcr;
        if(!lookup) this.obterCliente(event, service)
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
                offset: 0,
                limit: 50 
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
        let params;

        filterData.clienteId = filterData.id;
        filterData.numeroDocumento = filterData.numeroDocumentoFormatado;
        if(grupoEmpresaId) filterData.grupoId = grupoEmpresaId;

        if(grupoEmpresaId) {
            params = {
                grupoId: grupoEmpresaId,
                pagina: {
                    offset: page,
                    limit: this.itemsPerPage
                }
            }
        } else {
            params = {
                ...filterData,
                pagina: {
                    offset: page,
                    limit: this.itemsPerPage,
                    listaOrdenacao: multiSortMeta ? multiSortMeta.map((sort: any) => {
                        return {
                            campo: sort.field === "numeroDocumentoFormatado" ? "numeroDocumento" : sort.field,
                            ordenacao: sort.order < 0 ? "Asc" : "Desc"
                        };
                    }) : []
                }
            }
        }


        service.obterClientes(params)
        .subscribe((response: IObterClienteOutput) => {
            this.clienteSearchGridData = response.clientes;
            this.clienteSearchTotalRecords = response.totalRegistros;
        }, this.commonFunctions.errorHandler.bind(this));
    }

    public obterFormasPagamento() {
        const params = {
            empresasId: [this.empresaId],
            situacao: "Ativo"
        };
        this.filtrosServiceTcr.obterFormasPagamento(params)
            .subscribe((response: any) => this.formaPagamentoIdOptions = response.formasPagamento )
    }

    public verificacaoData() {
        this.verificarVencimentoUtil();
        this.verificarDataBaixa();
    }

    public verificarVencimentoUtil() {
        const params = {
            filialId: this.formGroup.value.filialIdProcessamento,
            clienteId: this.formGroup.value.clienteId.id,
            vencimento: this.commonFunctions.converterData(this.formGroup.value.dataBaixa)
        }

        this.filtrosServiceTcr.verificarVencimentoUtil(params)
            .subscribe((response: any) => {
                if(this.commonFunctions.converterData(response) !== this.commonFunctions.converterData(params.vencimento)) {
                    this.confirmationService.confirm({
                        header: this.translateService.instant("erp_fin.tcr_baixa.confirmacao_vencimento_util_titulo"),
                        message: this.translateService.instant("erp_fin.tcr_baixa.confirmacao_vencimento_util"),
                        accept: () => {
                            this.formGroup.get("dataBaixa").setValue(moment(response).toDate())
                        }
                      });
                }
            },
            (erro: Error) => this.commonFunctions.errorHandler(erro)
        )
    }

    public verificarDataBaixa() {
        const params = {
            filialProcessamentoId: this.formGroup.value.filialIdProcessamento,
            dataBaixa: this.commonFunctions.converterData(this.formGroup.value.dataBaixa)
        }

        this.filtrosService.verificarDataBaixa(params)
            .subscribe((response: any) => this.mensagemVerificaDatabaixa = response.dataValida)
    }
}
