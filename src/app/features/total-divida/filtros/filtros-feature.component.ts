import { Component, OnInit, ViewChild, Input, AfterViewInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from "@angular/forms";
import { FiltroGeralFeatureComponent } from "~src/app/features/total-divida/filtros/geral/filtro-geral.component";
import { FiltroTituloBaixar, FiltroTituloCompensar, FiltroTituloAproveitar } from "~core/models/TituloReceber";
import * as moment from "moment";
import { FiltroTitulosReceberFeatureComponent } from "~src/app/features/total-divida/filtros/titulos-receber/filtro-titulos-receber.component";
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";
import { FiltroCreditoFeatureComponent } from "~src/app/features/total-divida/filtros/creditos/creditos.component";
import { ConfirmationService } from "primeng/api";
import { FiltroTitulosPagarFeatureComponent } from "~src/app/features/total-divida/filtros/titulos-pagar/filtro-titulos-pagar.component";
import { Observable, forkJoin, of } from "rxjs";

@Component({
    selector: "filtros-feature",
    templateUrl: "./filtros-feature.html"
})

export class FiltrosFeatureComponent implements OnInit, AfterViewInit {
    public formFiltro: FormGroup;
    public locale: any = {};
    public loading: boolean;
    public mostraTituloAproveitar: boolean = true; // TODO: REVISAR
    public mostraTituloCompensar: boolean = true; // TODO: REVISAR
    public mostraValidacao: boolean;
    public validacaoData: string;
    public empresa: number;
    public empresaAnterior: number;
    public formGerais: any;
    public formTituloBaixar: any;
    public formTituloAproveitar: any;
    public formTituloCompensar: any;

    constructor(
        private translateService: TranslateService, 
        private formBuilder: FormBuilder, 
        private commonFunctions: CommonFunctions,
        private confirmationService: ConfirmationService,
        private commonTitulosService: CommonTitulosService
    ) { }

    @Input() localeConfig: any;
    @ViewChild(FiltroGeralFeatureComponent) filtroGeralFeature:FiltroGeralFeatureComponent;
    @ViewChild(FiltroTitulosReceberFeatureComponent) filtroTitulosReceberFeature: FiltroTitulosReceberFeatureComponent;
    @ViewChild(FiltroCreditoFeatureComponent) filtroCreditoFeatureComponent: FiltroCreditoFeatureComponent;
    @ViewChild(FiltroTitulosPagarFeatureComponent) filtroTitulosPagarFeatureComponent: FiltroTitulosPagarFeatureComponent;

    public ngOnInit() {
        this.createForm();
    }

    public ngAfterViewInit() {
        this.empresaAnterior = this.formFiltro.controls.filtrosGerais.get("empresaId").value;
        this.resetaTodoFiltro();
    }

    public resetaTodoFiltro() {
        this.formFiltro.controls.filtrosGerais.get("empresaId").valueChanges
            .subscribe((empresaId: any) => {
                if(!this.empresaAnterior) return this.empresaAnterior = empresaId;

                if(empresaId !== this.empresaAnterior) {
                    this.confirmationService.confirm({
                        header: this.translateService.instant("erp_fin.tcr_baixa.confirmacao_alteracao_empresa_titulo"),
                        message: this.translateService.instant("erp_fin.tcr_baixa.confirmacao_alteracao_empresa"),
                        key: "filtroFeature",
                        accept: () => {
                            this.empresaAnterior = empresaId;
                            this.formFiltro.reset(this.formFiltro);
                            sessionStorage.clear();
                            this.formFiltro.controls.filtrosGerais.get("empresaId").setValue(empresaId);
                        },
                        reject: () => {
                            this.formFiltro.controls.filtrosGerais.get("empresaId").setValue(this.empresaAnterior);
                        }
                    });
                }
            })
    }

    public carregaAba(aba: any) {
        if(aba.index === 1) this.filtroTitulosReceberFeature.guiaInit();

        if(aba.index === 2) {
            //this.mostraTituloAproveitar = true;
            // this.filtroCreditoFeatureComponent.guiaInit();
        }
        
        if(aba.index === 3) {
            //this.mostraTituloCompensar = true;
            setTimeout(()=> { //TODO: Fix para carregar as informações da guia após a guia realmente existir
                this.filtroTitulosPagarFeatureComponent.guiaInit();
            }, 100)
        }
    }

    public createForm() {
        this.formFiltro = this.formBuilder.group({
            filtrosGerais: this.formBuilder.group({
                empresaId: ['', Validators.required],
                filialId: ['', Validators.required],
                filialIdProcessamento: ['', Validators.required],
                dataBaixa: [{value: moment().toDate(), disabled: false}, Validators.required],
                grupoEmpresaId: [''],
                clienteId: ['', Validators.required],
                formaPagamentoId: ['']
            }),
            filtrosTitulosReceber: this.formBuilder.group({
                transacaoEntradaId: ['', Validators.required],
                numeroTitulo: [''],
                tipoTituloId: ['', Validators.required],
                dataVencimentoInicial: [moment().toDate()],
                dataVencimentoFinal: [moment().add(1, 'd').toDate()]
            }),
            filtrosCreditos: this.formBuilder.group({
                filialId: ['', Validators.required],
                clienteId: ['', Validators.required],
                transacaoEntradaId: [''],
                numeroTitulo: [''],
                tipoTituloId: [''],
                dataVencimentoInicial: [''],
                dataVencimentoFinal: ['']
            }),
            filtrosTitulosPagar: this.formBuilder.group({
                filialId: ['', Validators.required],
                fornecedorId: [''],
                transacaoEntradaId: [''],
                numeroTitulo: [''],
                tipoTituloId: [''],
                dataVencimentoInicial: [''],
                dataVencimentoFinal: ['']
            })
        })

        this.formGerais = this.formFiltro.controls.filtrosGerais;
        this.formTituloBaixar = this.formFiltro.controls.filtrosTitulosReceber;
        this.formTituloAproveitar = this.formFiltro.controls.filtrosCreditos;
        this.formTituloCompensar = this.formFiltro.controls.filtrosTitulosPagar;
    }

    public onSubmit() {
        this.commonTitulosService.filialProcessamentoId = this.formGerais.get("filialIdProcessamento").value // TODO: Provisório. Alterar local/formato para salvar informações.
        
        return new Observable((observer: any) => {

            const paramsTituloGeral = Object.assign(this.formGerais.value, this.formTituloBaixar.value);
            const paramsTituloBaixar = this.formataFormEnvio(paramsTituloGeral);
            const paramsTituloAproveitar = this.formataFormEnvio(this.formTituloAproveitar.value);
            const paramsTituloCompensar = this.formataFormEnvio(this.formTituloCompensar.value);

            //paramsTituloAproveitar.clienteId = paramsTituloAproveitar.transacaoEntradaId

            /* 
            if(this.formGerais.invalid) {
                //observer.error(this.translateService.instant("erp_fin.tcr_baixa.preencha_campos_obrigatorios"));
                observer.error("Erro no form geral");
                return this.commonFunctions.validateAllFormFields(this.formGerais);
            }
            if(this.formTituloBaixar.invalid) {
                //observer.error(this.translateService.instant("erp_fin.tcr_baixa.preencha_campos_obrigatorios"));
                observer.error("Erro no form Baixar");
                return this.commonFunctions.validateAllFormFields(this.formTituloBaixar);
            }
            if(this.formTituloAproveitar.touched && this.formTituloAproveitar.invalid) {
                //observer.error(this.translateService.instant("erp_fin.tcr_baixa.preencha_campos_obrigatorios"));
                observer.error("Erro no form Aproveitar");
                return this.commonFunctions.validateAllFormFields(this.formTituloAproveitar);
            }
            if(this.formTituloCompensar.touched && this.formTituloCompensar.invalid) {
                //observer.error(this.translateService.instant("erp_fin.tcr_baixa.preencha_campos_obrigatorios"));
                observer.error("Erro no form Compensar");
                return this.commonFunctions.validateAllFormFields(this.formTituloCompensar);
            }
             */
            const tituloBaixar = new FiltroTituloBaixar(
                paramsTituloBaixar.dataBaixa,
                paramsTituloBaixar.empresaId,
                paramsTituloBaixar.tipoTituloId,
                paramsTituloBaixar.transacaoEntradaId,
                paramsTituloBaixar.filialId,
                paramsTituloBaixar.filialIdProcessamento,
                paramsTituloBaixar.clienteId,
                paramsTituloBaixar.grupoEmpresaId,
                paramsTituloBaixar.formaPagamentoId,
                paramsTituloBaixar.numeroTitulo,
                paramsTituloBaixar.dataVencimentoInicial,
                paramsTituloBaixar.dataVencimentoFinal
            )

            const tituloAproveitar = new FiltroTituloAproveitar(
                paramsTituloBaixar.dataBaixa,
                paramsTituloBaixar.empresaId,
                paramsTituloAproveitar.tipoTituloId,
                paramsTituloAproveitar.transacaoEntradaId,
                paramsTituloAproveitar.filialId,
                paramsTituloAproveitar.clienteId,
                paramsTituloBaixar.grupoEmpresaId,
                paramsTituloAproveitar.numeroTitulo,
                paramsTituloAproveitar.dataVencimentoInicial,
                paramsTituloAproveitar.dataVencimentoFinal
            )

            const tituloCompensar = new FiltroTituloCompensar(
                paramsTituloBaixar.dataBaixa,
                paramsTituloBaixar.empresaId,
                paramsTituloCompensar.tipoTituloId,
                paramsTituloCompensar.transacaoEntradaId,
                paramsTituloCompensar.filialId,
                paramsTituloCompensar.fornecedorId,
                paramsTituloBaixar.grupoEmpresaId,
                paramsTituloCompensar.numeroTitulo,
                paramsTituloCompensar.dataVencimentoInicial,
                paramsTituloCompensar.dataVencimentoFinal
            )
            
            observer.next([
                {tituloBaixar: tituloBaixar}, 
                {tituloAproveitar: tituloAproveitar}, 
                {tituloCompensar: tituloCompensar}
            ])
        })
    }

    private formataFormEnvio(formulario: any) {
        const params = formulario;

        params.dataBaixa = this.commonFunctions.converterData(params.dataBaixa);
        params.dataVencimentoInicial = this.commonFunctions.converterData(params.dataVencimentoInicial);
        params.dataVencimentoFinal = this.commonFunctions.converterData(params.dataVencimentoFinal);
        params.filialId = params.filialId;
        params.numeroTitulo = params.numeroTitulo;
        params.tipoTituloId = this.retornaArrayId(params.tipoTituloId);
        params.transacaoEntradaId = this.retornaArrayId(params.transacaoEntradaId);
        params.clienteId = params.clienteId ? (Array.isArray(params.clienteId) ? this.retornaArrayId(params.clienteId) : Array.of(params.clienteId.id)) : undefined;
        params.fornecedorId = this.retornaArrayId(params.fornecedorId);
        
        return params; 
    }

    public retornaArrayId(valor: any) {
        if(!valor) return;
        const id = valor.map((prop: any) => prop.idFornecedor ? prop.idFornecedor : prop.id);
        return id;
    }

    public verificaRetornaArray(valor: any) {
        if(!valor || valor.length < 1) return [];
        const array = Array.of(valor)
        return array;
    }
}