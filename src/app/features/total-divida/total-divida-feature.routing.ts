import { NgModule, Injectable, Component } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { map } from "rxjs/operators";
import { MessageService } from "primeng/components/common/messageservice";
import { TranslateService } from "@ngx-translate/core";
import { LocaleService } from "@seniorsistemas/angular-components";

import { PermissionsService } from "~src/app/shared/permissions/permissions.service";
import { TotalDividaFeatureComponent } from "~src/app/features/total-divida/total-divida-feature.component";
//import { TotalizadorFeatureComponent } from '../../features/total-divida/totalizador/totalizador-feature.component';

@Injectable()
export class TotalDividaFeatureRoutingGuard implements CanActivate {
    constructor(
        private permissionsService: PermissionsService,
        private messageService: MessageService,
        private translate: TranslateService
    ) {}

    public canActivate() {
        return this.permissionsService.get("baixatitulos").pipe(
            map((permissions: any) => {
                if (!permissions.visualizar)
                    this.messageService.add({
                        severity: "warn",
                        summary: this.translate.instant("not_authorized_summary"),
                        detail: this.translate.instant("not_authorized_detail"),
                    });

                return permissions.visualizar;
            })
        );
    }
}

@Injectable()
export class TotalDividaFeatureRoutingTitleResolver {
    constructor(private translate: TranslateService) {}

    public resolve() {
        return this.translate.get("erp_fin.tcr_baixa.titulo_baixa_titulos");
    }
}

@Injectable()
export class TotalDividaFeatureRoutingPermissionResolver {
    constructor(private permissionsService: PermissionsService) {}

    public resolve() {
        return this.permissionsService.get();
    }
}

@Injectable()
export class TotalDividaFeatureRoutingLocaleResolver {
    constructor(private localeService: LocaleService) {}

    public resolve() {
        return this.localeService.get();
    }
}

@Component({
    template: `<router-outlet></router-outlet>`,
})
export class EmptyComponent {}

export const routes: Routes = [
    {
        path: "total-divida",
        component: EmptyComponent,
        canActivate: [TotalDividaFeatureRoutingGuard],
        resolve: {
            allPermissions: TotalDividaFeatureRoutingPermissionResolver,
            localeConfig: TotalDividaFeatureRoutingLocaleResolver,
            routeTitle: TotalDividaFeatureRoutingTitleResolver,
        },
        children: [
            {
                path: "",
                component: TotalDividaFeatureComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TotalDividaFeatureRoutingGuard,
        TotalDividaFeatureRoutingTitleResolver,
        TotalDividaFeatureRoutingPermissionResolver,
        TotalDividaFeatureRoutingLocaleResolver,
        TotalDividaFeatureComponent,
        //TotalizadorFeatureComponent, 
    ],
    declarations: [EmptyComponent],
})
export class TotalDividaFeatureRouting {}
