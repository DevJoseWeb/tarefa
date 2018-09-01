import { Injectable } from "@angular/core";
import { of } from "rxjs/observable/of";

@Injectable()
export class CustomFieldsShowcaseService {
    getCustomFields() {
        return of({
            entity_: {
                active: true,
                fields: [
                    getFieldMock("name", "Name", "Nome", "String"),
                    getFieldMock("twitter", "Twitter", "Usuário do twitter (@usuario)", "String", undefined, "[@].*"),
                    getFieldMock("dependents", "Dependents", "Dependentes", "Integer", "99"),
                    getFieldMock("birthday", "Birthday", "Aniversário", "Date"),
                ],
            },
        });
    }
}

function getFieldMock(id: any, label: string, tooltip: string, type: string, mask?: string, regex?: string) {
    return {
        id,
        customizable: true,
        customization: {
            active: true,
            label,
            tooltip,
            mask,
            validationRegex: regex,
        },
        type,
    };
}
