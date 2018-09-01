import { NgModule, Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { retrocycle, decycle } from "json-cycle";

@Injectable()
export class CyclicJsonInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ body: decycle(req.body) });
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    event = event.clone({ body: retrocycle(event.body) });
                }
                return event;
            })
        );
    }
}
