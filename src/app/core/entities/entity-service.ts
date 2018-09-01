import { HttpParams, HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";
import { SortMeta } from "primeng/components/common/api";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class EntityService<T> {
    constructor(protected http: HttpClient, protected messageService: MessageService, protected entityUrl: string) {
        this.http = http;
        this.messageService = messageService;
        this.entityUrl = entityUrl;

        this.defaultCatch = this.defaultCatch.bind(this);
    }

    public getListQueryParams(listParams: ListParams) {
        const { page = 0, size = 10, sort = [], filterQuery = "", displayFields = [] } = listParams;

        let params = new HttpParams();
        params = params.append("size", String(size));
        params = params.append("offset", String(page));

        if (sort && sort.length) {
            params = params.append(
                "orderby",
                sort
                    .map(s => {
                        let order = "";
                        if (s.order === 1) order = " asc";
                        else if (s.order === -1) order = " desc";
                        return `${s.field}${order}`;
                    })
                    .join(", ")
            );
        }

        if (filterQuery) params = params.append("filter", filterQuery);

        if (displayFields && displayFields.length) {
            params = params.append("displayfields", displayFields.join());
        }

        return params;
    }

    public defaultCatch() {
        return catchError((err: any) => {
            if (err) {
                const summary = err.status ? String(err.status) : "Error";
                const detail = (err.error && err.error.message) || err.statusText || err.message || "Error";

                this.messageService.add({
                    severity: "error",
                    summary,
                    detail,
                });
            }

            return throwError(err);
        });
    }

    public list(listParams: ListParams) {
        return this.http.get<T[]>(this.entityUrl, { params: this.getListQueryParams(listParams) }).pipe(this.defaultCatch());
    }

    public get(id: any) {
        return this.http.get<T>(`${this.entityUrl}/${id}`).pipe(this.defaultCatch());
    }

    public insert(entity: T) {
        return this.http.post<T>(`${this.entityUrl}`, entity).pipe(this.defaultCatch());
    }

    public update(id: any, entity: T) {
        return this.http.put<T>(`${this.entityUrl}/${id}`, entity).pipe(this.defaultCatch());
    }

    public delete(id: any) {
        return this.http.delete<T>(`${this.entityUrl}/${id}`).pipe(this.defaultCatch());
    }
}

export interface ListParams {
    page?: number;
    size?: number;
    sort?: SortMeta[];
    filterQuery?: string;
    displayFields?: string[];
}
