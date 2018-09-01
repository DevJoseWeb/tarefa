import { Component, OnInit, Input } from "@angular/core";
import { TotalizadorFeatureService } from '~core/entities/totalizador/totalizador-feature.service';
import { IRecFiltroTituloReceberInput } from "~src/app/core/models/TituloReceber";
import { CalcularTotal } from "~src/app/core/models/CalcularTotal";
import { forkJoin } from "rxjs";

@Component({
    selector: "totalizador-feature-component",
    templateUrl: "./totalizador-feature.html"
})

export class TotalizadorFeatureComponent implements OnInit {

    public totalBaixar: number = 0;
    public totalAproveitar: number = 0;
    public totalCompensar: number = 0;
    public totalReceber: number = 10; //TODO: Alterar para 0
    public mostraBaixaTitulos: boolean = false;

    constructor( private totalizadorFeatureService:TotalizadorFeatureService ) { }

    public ngOnInit() { }

    public buscaTotais(filtroTitulos: any) {
        const filtros = filtroTitulos.reduce((p: any, n: any) => ({...p, ...n}), {})
        forkJoin(
            this.calcularTotalBaixar(filtros.tituloBaixar),
            this.calcularTotalAproveitar(filtros.tituloAproveitar),
            this.calcularTotalCompensar(filtros.tituloCompensar)
        )
        .subscribe(totais => {
            const total = totais.reduce((acc: any, val: any) => ({...acc, ...val}), {})
            console.log(total)
            /* this.totalBaixar = ;
            this.totalAproveitar = ;
            this.totalCompensar = ;
            this.totalReceber = this.totalBaixar - (this.totalAproveitar + this.totalCompensar); */
        })
        // this.calcularTotalBaixar(filtros.tituloBaixar);
        // this.calcularTotalAproveitar(filtros.tituloAproveitar);
        // this.calcularTotalCompensar(filtros.tituloCompensar);
    }

    public calcularTotalBaixar(filtroTitulos: IRecFiltroTituloReceberInput) {
        const params = new CalcularTotal(
            filtroTitulos
        )

        return this.totalizadorFeatureService.calcularTotalBaixar(params)
            //.subscribe((total: any) => this.totalBaixar = total)
    }

    public calcularTotalAproveitar(filtroTitulos: IRecFiltroTituloReceberInput) {
        const params = new CalcularTotal(
            filtroTitulos, 
        )
        
        return this.totalizadorFeatureService.calcularTotalAproveitar(params)
            //.subscribe((total: any) => this.totalAproveitar = total)
    }

    public calcularTotalCompensar(filtroTitulos: IRecFiltroTituloReceberInput) {
        const params = new CalcularTotal(
            filtroTitulos
        )

        return this.totalizadorFeatureService.calcularTotalCompensar(params)
            //.subscribe((total: any) => this.totalCompensar = total)
    }
}
