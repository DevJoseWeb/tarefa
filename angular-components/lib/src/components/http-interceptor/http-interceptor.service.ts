import { Injectable } from "@angular/core";
import { HttpInterceptor as AngularHttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { user } from "@seniorsistemas/senior-platform-data";
import { Observable, forkJoin, defer, from } from "rxjs";
import { flatMap } from "rxjs/operators";

import { RestUrl } from "./rest-url.service";

@Injectable()
export class HttpInterceptor implements AngularHttpInterceptor {
    constructor(private restUrl: RestUrl) {}

    public intercept(originalReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!originalReq.url.includes(`://`)) {
            const getRestUrl = this.restUrl.get();
            const getAuthHeader = defer(() => from(user.getAuthHeader()));
            return forkJoin(getRestUrl, getAuthHeader).pipe(
                flatMap((values: any) => {
                    const [bridgeUrl, authHeader] = values;
                    const request = originalReq.clone({
                        url: bridgeUrl + originalReq.url,
                        headers: originalReq.headers.set(`Authorization`, authHeader),
                    });
                    return next.handle(request);
                })
            );
        }
        return next.handle(originalReq);
    }
}
