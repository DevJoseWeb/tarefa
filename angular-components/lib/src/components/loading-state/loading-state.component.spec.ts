import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { LoadingStateComponent } from "./loading-state.component";

describe("LoadingStateComponent", () => {
    let component: LoadingStateComponent;
    let fixture: ComponentFixture<LoadingStateComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, NoopAnimationsModule],
            declarations: [LoadingStateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingStateComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct ID's", () => {
        expect(component.id).toMatch("s-loading-state-[d]*");
        expect(element.querySelector(`#${component.id}`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-loader`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-spinner`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-overlay`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-contents`)).toBeTruthy();

        const id = "test-id";
        component.id = id;
        fixture.detectChanges();

        expect(element.querySelector(`#${id}`)).toBeTruthy();
        expect(element.querySelector(`#${id}-loader`)).toBeTruthy();
        expect(element.querySelector(`#${id}-spinner`)).toBeTruthy();
        expect(element.querySelector(`#${id}-overlay`)).toBeTruthy();
        expect(element.querySelector(`#${id}-contents`)).toBeTruthy();
    });

    it(
        "should block after 300ms loading",
        fakeAsync(() => {
            expect(component.loading).toBeFalsy();
            expect(component.blocking).toBeFalsy();

            component.loading = true;
            fixture.detectChanges();
            expect(component.blocking).toBeFalsy();

            tick(100);
            fixture.detectChanges();
            expect(component.blocking).toBeFalsy();

            tick(199);
            fixture.detectChanges();
            expect(component.blocking).toBeFalsy();

            tick(2);
            fixture.detectChanges();
            expect(component.blocking).toBeTruthy();
        })
    );

    it(
        "should unblock after 200ms not loading",
        fakeAsync(() => {
            component.loading = true;
            tick(301);
            fixture.detectChanges();
            expect(component.blocking).toBeTruthy();

            component.loading = false;
            fixture.detectChanges();
            expect(component.blocking).toBeTruthy();

            tick(100);
            fixture.detectChanges();
            expect(component.blocking).toBeTruthy();

            tick(99);
            fixture.detectChanges();
            expect(component.blocking).toBeTruthy();

            tick(2);
            fixture.detectChanges();
            expect(component.blocking).toBeFalsy();
        })
    );
});
