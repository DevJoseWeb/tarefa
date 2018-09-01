import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";
import { TranslateService } from "@ngx-translate/core";
import { from, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { user } from "@seniorsistemas/senior-platform-data";

import { environment } from "~src/environments/environment";
import { RESOURCES, Resources, Resource } from "~src/app/shared/permissions/permissions.config";

export let promise: Promise<any>;

@Injectable({
    providedIn: "root",
})
export class PermissionsService {
    private actionUrl = "usuarios/userManager/actions/";

    constructor(
        @Inject(RESOURCES) private resources: Resources,
        private http: HttpClient,
        private messageService: MessageService,
        private translate: TranslateService
    ) {}

    public get(resource: string = "") {
        if (!promise) promise = this.getPermissions();

        return from(promise).pipe(
            map((permissions: any) => {
                if (resource) {
                    const resourceKey = Object.keys(permissions).find(key => key.toLowerCase() == resource.toLowerCase());
                    return permissions[resourceKey];
                }

                return permissions;
            }),
            catchError((err: any) => {
                promise = undefined;

                this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("permission_error_summary"),
                    detail: this.translate.instant("permission_error_detail"),
                });

                return of(this.getPermissionObject(false));
            })
        );
    }

    private getFlatResources() {
        return this.resources.reduce((result: Resource[], item: any) => {
            if (!item) return result;
            if (Array.isArray(item)) return [...result, ...item];
            return [...result, item];
        }, []);
    }

    private getPermissionObject(defaultValue: boolean) {
        return this.getFlatResources().reduce((resources: object, resource: Resource) => {
            resources[resource.name] = resource.actions.reduce((actions, action) => {
                actions[action] = defaultValue;
                actions[action.toLowerCase()] = defaultValue;
                return actions;
            }, {});
            return resources;
        }, {});
    }

    private async getPermissions() {
        if (environment.ignorePermissions) return this.getPermissionObject(true);

        const resources = this.getFlatResources();
        const userData = await user.getUserData();
        const permissions: any[] = await this.http
            .post<any>(`${this.actionUrl}verificaPermissoesRecursos`, {
                nomeUsuario: userData.nome,
                recursos: resources.map((resource: Resource) => ({
                    acoesPermissao: resource.actions,
                    uriRecurso: resource.uri,
                })),
            })
            .toPromise()
            .then(response => response.permissoes);

        const values = {};

        permissions.forEach((perm: any) => {
            const resource = resources.find(res => res.uri == perm.uriRecurso);
            const { name } = resource;

            values[name] = {};
            perm.acoesPermissao.forEach((action: any) => {
                values[name][action.nomeAcao] = action.permitido;
                values[name][action.nomeAcao.toLowerCase()] = action.permitido;
            });
        });

        return values;
    }
}
