import { Injectable } from "@angular/core";
import { Column } from "primeng/shared";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

import { people } from "~resources/people";

@Injectable()
export class LoadingStateShowcaseService {
    public getTableData(page = 0, size = 10, timeout = 2000) {
        return of({
            contents: people.slice(page * size, size + size * page),
            totalSize: people.length,
        }).pipe(delay(timeout));
    }

    public getTableColumns(): Partial<Column>[] {
        return [
            { field: "id", header: "Id" },
            { field: "name", header: "Nome" },
            { field: "age", header: "Idade" },
            { field: "email", header: "Email" },
            { field: "phone", header: "Telefone" },
        ];
    }
}
