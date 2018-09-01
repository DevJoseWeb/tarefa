import { NgModule } from "@angular/core";
import { PermissionsModule } from "~src/app/shared/permissions/permissions.module";
import { TotalizadorFeatureService } from "~src/app/core/entities/totalizador/totalizador-feature.service";

@NgModule({
    imports: [
        PermissionsModule.forChild({
            name: "baixaTitulos",
            actions: ["Visualizar", "Incluir", "Editar", "Excluir"],
            uri: `res://senior.com.br/erp_fin/tcr_baixa/entities/baixaTitulos`
        })
    ],
    providers: [
        TotalizadorFeatureService,
    ],
})

export class TotalizadorModule {}
