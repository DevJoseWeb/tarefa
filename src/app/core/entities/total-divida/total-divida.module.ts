import { NgModule } from "@angular/core";

import { environment } from "~src/environments/environment";
import { PermissionsModule } from "~src/app/shared/permissions/permissions.module";
import { TotalDividaService } from "~src/app/core/entities/total-divida/total-divida.service";

@NgModule({
    imports: [
        PermissionsModule.forChild({
            name: "totalDivida",
            actions: ["Visualizar", "Incluir", "Editar", "Excluir"],
            uri: `res://senior.com.br/${environment.project.domain}/${environment.project.service}/totalTitulo`,
        }),
    ],
    providers: [TotalDividaService],
})
export class TotalDividaModule {}
