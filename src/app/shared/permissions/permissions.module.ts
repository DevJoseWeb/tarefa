import { NgModule, ModuleWithProviders } from "@angular/core";

import { RESOURCES, Resource } from "~src/app/shared/permissions/permissions.config";
import { PermissionsService } from "~src/app/shared/permissions/permissions.service";

@NgModule()
export class PermissionsModule {
    public static forRoot(...resources: Resource[]): ModuleWithProviders {
        return {
            ngModule: PermissionsModule,
            providers: [PermissionsService, { provide: RESOURCES, multi: true, useValue: resources }],
        };
    }

    public static forChild(...resources: Resource[]): ModuleWithProviders {
        return {
            ngModule: PermissionsModule,
            providers: [{ provide: RESOURCES, multi: true, useValue: resources }],
        };
    }
}
