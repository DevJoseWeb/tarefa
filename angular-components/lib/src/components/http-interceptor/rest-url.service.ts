import { service } from "@seniorsistemas/senior-platform-data";
import { Injectable } from "@angular/core";
import { Observable, defer, from } from "rxjs";

@Injectable()
export class RestUrl {
    get(): Observable<string> {
        return defer(() => from(service.getRestUrl()));
    }
}
