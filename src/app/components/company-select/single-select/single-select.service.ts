import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { environment } from "~src/environments/environment";

@Injectable()
export class SingleSelectService {

    private searchUrl = `${environment.project.domain}`;
    
    constructor(
        private http: HttpClient,
    ) {};

    search(searchQuery?: any, endPoint?: string): Observable < any > {
        return this.http.post < any > (`${this.searchUrl}/${endPoint}`, searchQuery );
    }
    
    get(id: any, endPoint?: string) {
        return this.http.get < any > (`${this.searchUrl}/${endPoint}/${id}`);
    }

}