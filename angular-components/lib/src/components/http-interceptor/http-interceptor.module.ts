import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { RestUrl } from "./rest-url.service";
import { HttpInterceptor } from "./http-interceptor.service";

@NgModule({
    imports: [HttpModule, HttpClientModule],
    providers: [RestUrl, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }],
})
export class HttpInterceptorModule {}
