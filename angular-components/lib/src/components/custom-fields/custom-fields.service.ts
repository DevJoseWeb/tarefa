import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CustomFieldsService {
    constructor(private http: HttpClient) {}

    getCustomFields(domain: string, service: string, entity: string): Observable<any> {
        const endpoint = `platform/field_customization/queries/getEntity`;
        const entityDto = { entityId: { domain_: domain, service_: service, id: entity } };
        return this.http.post(endpoint, entityDto);
    }
}
