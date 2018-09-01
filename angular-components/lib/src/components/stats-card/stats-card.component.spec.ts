import { CommonModule } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipModule } from "primeng/tooltip";

import { StatsCardComponent } from "./stats-card.component";

describe("StatsCardComponent", () => {
    let component: StatsCardComponent;
    let fixture: ComponentFixture<StatsCardComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, NoopAnimationsModule, CommonModule, TooltipModule],
            declarations: [StatsCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsCardComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct ID's", () => {
        expect(component.id).toMatch("s-stats-card-[d]*");
        expect(element.querySelector(`#${component.id}`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-info-container`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-icon-container`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-icon`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-text-container`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-label`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-value`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-overlay`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-background`)).toBeTruthy();

        const id = "test-id";
        component.id = id;
        fixture.detectChanges();

        expect(element.querySelector(`#${id}`)).toBeTruthy();
        expect(element.querySelector(`#${id}-info-container`)).toBeTruthy();
        expect(element.querySelector(`#${id}-icon-container`)).toBeTruthy();
        expect(element.querySelector(`#${id}-icon`)).toBeTruthy();
        expect(element.querySelector(`#${id}-text-container`)).toBeTruthy();
        expect(element.querySelector(`#${id}-label`)).toBeTruthy();
        expect(element.querySelector(`#${id}-value`)).toBeTruthy();
        expect(element.querySelector(`#${id}-overlay`)).toBeTruthy();
        expect(element.querySelector(`#${id}-background`)).toBeTruthy();
    });

    it("should replace numeric values correctly", () => {
        let value = "R$ 999.999,99";

        expect(component.replaceNumericPositions(value)).toEqual("R$ 000.000,00");
        expect(component.replaceNumericPositions(value, "123")).toEqual("R$ 000.001,23");
        expect(component.replaceNumericPositions(value, "555555")).toEqual("R$ 005.555,55");
        expect(component.replaceNumericPositions(value, "00123456")).toEqual("R$ 001.234,56");
        expect(component.replaceNumericPositions(value, "12345600")).toEqual("R$ 123.456,00");

        value = "25.54%";

        expect(component.replaceNumericPositions(value)).toEqual("00.00%");
        expect(component.replaceNumericPositions(value, "999")).toEqual("09.99%");
        expect(component.replaceNumericPositions(value, "1111111")).toEqual("11.11%");
    });
});
