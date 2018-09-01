import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CyclicJsonInterceptor } from "./cyclic-json-interceptor.service";

@NgModule({
    imports: [HttpModule, HttpClientModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: CyclicJsonInterceptor, multi: true }],
})
export class CyclicJsonInterceptorModule {}
