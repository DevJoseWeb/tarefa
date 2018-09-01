import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { environment } from "~src/environments/environment";

@Injectable()
export class MultiselectService {

    private searchUrl = `${environment.project.domain}`;
    
    constructor(
        private http: HttpClient,
    ) {};

    search(searchQuery?: any, filterEndPoint?: string): Observable < any > {
        return this.http.post < any > (`${this.searchUrl}/${filterEndPoint}`, searchQuery );
    }

    getAllItems(getOneEndPoint: string, filterConditionalAll?: any, getAllRequestField?: string){
        let query = {};
        let filter: any[] = [];
        if ((filterConditionalAll && filterConditionalAll.length == 0) ) {
            filter.push(filterConditionalAll)
        } else {
            filter = filterConditionalAll;
        }
        filterConditionalAll && getAllRequestField ? query[getAllRequestField] = filter : null;
        return this.http.post < any > (`${this.searchUrl}/${getOneEndPoint}`, query);
    }

    get(id: any, filterEndPoint?: string) {
        return this.http.get < any > (`${this.searchUrl}/${filterEndPoint}/${id}` );
    }

}