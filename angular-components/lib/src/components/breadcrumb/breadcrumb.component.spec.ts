import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { BreadcrumbModule as PrimeBreadcrumbModule } from "primeng/breadcrumb";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { BreadcrumbComponent } from "./breadcrumb.component";

describe("BreadcrumbComponent", () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PrimeBreadcrumbModule, RouterTestingModule.withRoutes([])],
            declarations: [BreadcrumbComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: {
                            routeTitle: "My Route",
                        },
                        snapshot: {
                            data: {
                                routeTitle: "My Route",
                            },
                            url: [],
                        },
                        pathFromRoot: [],
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
