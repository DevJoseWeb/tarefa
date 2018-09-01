import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { decycle } from "json-cycle";

import { CyclicJsonInterceptor } from "./cyclic-json-interceptor.service";

interface User {
    name: string;
    age: number;
    dependent?: User;
    parent?: User;
}

describe("CyclicJsonInterceptor", () => {
    let mockParentObject: User;
    let mockDependentObject: User;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: HTTP_INTERCEPTORS, useClass: CyclicJsonInterceptor, multi: true }],
        });

        mockParentObject = { name: "Test", age: 40 };
        mockDependentObject = { name: "Test Dependent", age: 20, parent: mockParentObject };
        mockParentObject.dependent = mockDependentObject;
    });

    it(
        "should intercept and transform requests",
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            http.post("/api", mockParentObject).subscribe(response => expect(response).toBeTruthy());
            const httpRequest = httpMock.expectOne("/api");

            expect(httpRequest.request.body.dependent.parent.$ref).toBe("$");
        })
    );

    it(
        "should intercept and transform responses",
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            http.get<User>("/api").subscribe(response => {
                expect(response).toBeDefined();
                expect(response.dependent.parent).toEqual(response);
            });

            const httpRequest = httpMock.expectOne("/api");
            httpRequest.flush(decycle(mockParentObject));
            httpMock.verify();
        })
    );
});
