import { NgModule } from "@angular/core";
import { PermissionsModule } from "~src/app/shared/permissions/permissions.module";
import { FiltrosServices } from "~src/app/core/entities/filtros/filtros.service";
import { FiltrosServicesTCR } from "~core/entities/filtros/filtros-tcr.service";
import { FiltrosServicesTCP } from "~core/entities/filtros/filtros-tcp.service";

@NgModule({
    imports: [
        PermissionsModule.forChild({
            name: "baixaTitulos",
            actions: ["Visualizar", "Incluir", "Editar", "Excluir"],
            uri: `res://senior.com.br/erp_fin/tcr_baixa/entities/baixaTitulos`
        })
    ],
    providers: [
        FiltrosServices,
        FiltrosServicesTCR,
        FiltrosServicesTCP,
    ],
})

export class FiltrosModule {}
