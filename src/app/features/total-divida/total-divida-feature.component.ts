import { Component, ViewChild, OnInit } from "@angular/core";
import { FiltrosFeatureComponent } from "~src/app/features/total-divida/filtros/filtros-feature.component";
import { TotalizadorFeatureComponent } from "~src/app/features/total-divida/totalizador/totalizador-feature.component";
import { ActivatedRoute } from "@angular/router";
import { CommonTitulosService } from "~src/app/shared/common-titulos.service";
import { CommonFunctions } from "~src/app/shared/common-function.service";
import { IRecFiltroTituloReceberInput } from "~src/app/core/models/TituloReceber";

@Component({
    selector: "total-divida-feature",
    templateUrl: "./total-divida-feature.html"
})

export class TotalDividaFeatureComponent implements OnInit {

    public colapseFiltro: boolean = false;
    public mostraAcoesBaixa: boolean = false;
    public locale: any = {};
    @ViewChild(FiltrosFeatureComponent) public filtrosFeature: FiltrosFeatureComponent;
    @ViewChild(TotalizadorFeatureComponent) public totalizadorFeature: TotalizadorFeatureComponent;

    constructor(
        private activatedRoute: ActivatedRoute,
        private commonTitulo: CommonTitulosService,
        private commonFunctions: CommonFunctions) {}

    public ngOnInit() {
        this.localeConfig();
    }

    public localeConfig() {
        this.activatedRoute.data.subscribe((response: any) => {
            this.locale = response.localeConfig;
        });
    }

    public onSubmit() {
        this.filtrosFeature.onSubmit()
            .subscribe((response: any) => {
                //console.log(response)
                // this.commonTitulo.recebeFiltroTitulo(response)
                // this.colapseFiltro = true;
                this.mostraAcoesBaixa = true;
                //this.totalizadorFeature.buscaTotais(response);
            },
            (error: Error) => {
                this.commonFunctions.errorHandler(error);
                console.error(error);
            });
    }
}
