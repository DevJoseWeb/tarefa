import { Injectable } from "@angular/core";
import { Column } from "primeng/shared";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

import { people } from "~resources/people";
import { countries } from "~resources/countries";

@Injectable()
export class TableShowcaseService {
    public getPeopleTableData(page = 0, size = 10) {
        return of({
            contents: people
                .slice(page * size, size + size * page)
                .map(person => ({ ...person, birthday: new Date(person.birthday.raw * 1000) })),
            totalSize: people.length,
        }).pipe(delay(1000));
    }

    public getPeopleTableColumns(): Partial<Column>[] {
        return [
            { field: "id", header: "Id" },
            { field: "name", header: "Nome" },
            { field: "age", header: "Idade" },
            { field: "email", header: "Email" },
            { field: "phone", header: "Telefone" },
            { field: "gender", header: "Gênero" },
            { field: "birthday", header: "Aniversário" },
        ];
    }

    public getCountryTableData(page = 0, size = 10) {
        return of({
            contents: countries.slice(page * size, size + size * page),
            totalSize: countries.length,
        }).pipe(delay(1000));
    }

    public getCountryTableColumns(): Partial<Column>[] {
        return [{ field: "name", header: "Nome" }, { field: "code", header: "Código" }];
    }
}
