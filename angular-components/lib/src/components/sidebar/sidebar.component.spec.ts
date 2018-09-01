import { CommonModule } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SidebarModule as PrimeSidebar } from "primeng/sidebar";

import { StructureModule } from "../structure/structure.module";
import { SidebarComponent } from "./sidebar.component";

describe("SidebarComponent", () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, NoopAnimationsModule, PrimeSidebar, ScrollPanelModule, StructureModule],
            declarations: [SidebarComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct ID's", () => {
        expect(component.id).toMatch("s-sidebar-[d]*");
        expect(element.querySelector(`#${component.id}`)).toBeTruthy();
        expect(document.querySelector(`#${component.id}-container`)).toBeTruthy();
        expect(document.querySelector(`#${component.id}-header`)).toBeFalsy();
        expect(document.querySelector(`#${component.id}-content-container`)).toBeTruthy();
        expect(document.querySelector(`#${component.id}-footer`)).toBeFalsy();

        component.header = "Header";
        component.footerSection = "<s-footer>Footer</s-footer>";
        fixture.detectChanges();

        expect(document.querySelector(`#${component.id}-header`)).toBeTruthy();
        expect(document.querySelector(`#${component.id}-footer`)).toBeTruthy();

        const id = "test-id";
        component.id = id;
        fixture.detectChanges();

        expect(element.querySelector(`#${id}`)).toBeTruthy();
        expect(document.querySelector(`#${id}-container`)).toBeTruthy();
        expect(document.querySelector(`#${id}-header`)).toBeTruthy();
        expect(document.querySelector(`#${id}-content-container`)).toBeTruthy();
        expect(document.querySelector(`#${id}-footer`)).toBeTruthy();
    });

    it("should show the correct header", () => {
        component.header = "Título";
        fixture.detectChanges();
        expect(document.querySelector(`#${component.id}-header`).innerHTML).toContain("Título");

        component.header = "Teste";
        fixture.detectChanges();
        expect(document.querySelector(`#${component.id}-header`).innerHTML).toContain("Teste");
    });
});
