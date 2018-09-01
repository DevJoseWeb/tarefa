import { NgModule } from "@angular/core";
import { PermissionsModule } from "~src/app/shared/permissions/permissions.module";
import { OperacoesBaixasService } from "~src/app/core/entities/operacoes-baixas/operacoes-baixas.service";

@NgModule({
    imports: [
        PermissionsModule.forChild({
            name: "operacoesBaixas",
            actions: ["Visualizar", "Incluir", "Editar", "Excluir"],
            uri: `res://senior.com.br/erp_fin/tcr_baixa/entities/operacoesBaixas`
        })
    ],
    providers: [
        OperacoesBaixasService,
    ],
})

export class OperacoesBaixasModule {}
