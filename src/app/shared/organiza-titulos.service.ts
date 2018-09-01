import { Injectable } from "@angular/core";
import { RecFiltroTituloReceber } from "~src/app/core/models/TituloReceber";
import { TotalizadorFeatureService } from "~src/app/core/entities/totalizador/totalizador-feature.service";
import { forkJoin, of, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class OrganizaTitulosService {
    private titulo: RecFiltroTituloReceber;

    constructor( private totalizadorService: TotalizadorFeatureService ) {}

    public recebeFiltroTitulo(params: RecFiltroTituloReceber) {
        this.titulo = params;
    }

    public filtroTitulo() {
        return this.titulo;
    }

    public retornaTotais() {
        return forkJoin(
            of(this.totalizadorService.baixarMock(this.filtroTitulo)),
            of(this.totalizadorService.creditoMock(this.filtroTitulo)),
            of(this.totalizadorService.compensarMock(this.filtroTitulo))
        );
    }

}
