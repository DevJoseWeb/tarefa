import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";

import { ButtonModule } from "../button/index";
import { EmptyStateComponent } from "./empty-state.component";

describe("EmptyStateComponent", () => {
    let component: EmptyStateComponent;
    let fixture: ComponentFixture<EmptyStateComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, ButtonModule],
            declarations: [EmptyStateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmptyStateComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct ID's", () => {
        component.title = "Nothing to show";
        component.description = "This is a description";
        component.primaryActionLabel = "Confirm";
        component.secondaryActionLabel = "Cancel";
        fixture.detectChanges();

        expect(component.id).toMatch("s-empty-state-[d]*");
        expect(element.querySelector(`#${component.id}`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-title`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-description`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-icon`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-actions`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-primary-action`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-secondary-action`)).toBeTruthy();

        const id = "test-id";
        component.id = id;
        fixture.detectChanges();

        expect(element.querySelector(`#${id}`)).toBeTruthy();
        expect(element.querySelector(`#${id}-title`)).toBeTruthy();
        expect(element.querySelector(`#${id}-description`)).toBeTruthy();
        expect(element.querySelector(`#${id}-icon`)).toBeTruthy();
        expect(element.querySelector(`#${id}-actions`)).toBeTruthy();
        expect(element.querySelector(`#${id}-primary-action`)).toBeTruthy();
        expect(element.querySelector(`#${id}-secondary-action`)).toBeTruthy();
    });

    it("should show the icon correctly", () => {
        expect(element.querySelector(".fa.fa-inbox")).toBeTruthy();

        component.iconClass = "fa fa-users";
        fixture.detectChanges();
        expect(element.querySelector(".fa.fa-users")).toBeTruthy();
    });

    it("should show the title correctly", () => {
        const title = "Nothing to show";

        component.title = title;
        fixture.detectChanges();

        expect(element.querySelector(`#${component.id}-title`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-title`).innerHTML).toEqual(title);
    });

    it("should show the description correctly", () => {
        const description = "This is a description";

        expect(element.querySelector(`#${component.id}-description`)).toBeFalsy();

        component.description = description;
        fixture.detectChanges();

        expect(element.querySelector(`#${component.id}-description`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-description p`).innerHTML).toEqual(description);
    });

    it("should not show actions per default", () => {
        expect(element.querySelector(`#${component.id}-actions`)).toBeFalsy();
    });

    it("should show the primary action correctly", () => {
        const primaryActionLabel = "Confirm";
        component.primaryActionLabel = primaryActionLabel;
        fixture.detectChanges();

        expect(element.querySelector(`#${component.id}-actions`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-primary-action`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-primary-action span`).innerHTML).toEqual(primaryActionLabel);
    });

    it("should show the secondary action correctly", () => {
        const primaryActionLabel = "Confirm";
        const secondaryActionLabel = "Cancel";

        component.primaryActionLabel = primaryActionLabel;
        fixture.detectChanges();

        expect(element.querySelector(`#${component.id}-actions`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-secondary-action`)).toBeFalsy();

        component.secondaryActionLabel = secondaryActionLabel;
        fixture.detectChanges();

        expect(element.querySelector(`#${component.id}-secondary-action`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-secondary-action span`).innerHTML).toEqual(secondaryActionLabel);
    });

    it("should not show the actions if explicitly told so", () => {
        const primaryActionLabel = "Confirm";
        const secondaryActionLabel = "Cancel";

        component.primaryActionLabel = primaryActionLabel;
        component.secondaryActionLabel = secondaryActionLabel;
        component.showSecondaryAction = false;
        fixture.detectChanges();

        expect(element.querySelector(`#${component.id}-primary-action`)).toBeTruthy();
        expect(element.querySelector(`#${component.id}-secondary-action`)).toBeFalsy();

        component.showPrimaryAction = false;
        fixture.detectChanges();

        expect(element.querySelector(`#${component.id}-actions`)).toBeFalsy();
    });
});
