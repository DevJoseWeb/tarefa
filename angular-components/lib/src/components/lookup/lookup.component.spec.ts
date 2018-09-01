import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule as PrimeButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { AutoCompleteModule } from "primeng/autocomplete";
import { DialogModule } from "primeng/dialog";

import { FieldType } from "../dynamic-form/index";
import { LocaleModule } from "../locale/index";
import { DynamicFormModule } from "../dynamic-form/index";
import { ButtonModule } from "../button/index";
import { EmptyStateModule } from "../empty-state/index";
import { LoadingStateModule } from "../loading-state/index";
import { LookupComponent } from "./lookup.component";

describe("LookupComponent", () => {
    const suggestions: any[] = [];
    const gridData: any[] = [];
    const totalRecords = 0;
    const fields = [
        {
            name: "name",
            label: "Nome",
            type: FieldType.String,
        },
        {
            name: "code",
            label: "Código",
            type: FieldType.String,
        },
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                InputTextModule,
                CheckboxModule,
                PrimeButtonModule,
                PanelModule,
                CommonModule,
                FormsModule,
                AutoCompleteModule,
                DialogModule,
                LocaleModule,
                TableModule,
                ButtonModule,
                DynamicFormModule,
                NoopAnimationsModule,
                EmptyStateModule,
                LoadingStateModule,
            ],
            declarations: [LookupComponent],
        }).compileComponents();
    }));

    describe("Single", () => {
        let component: LookupComponent;
        let fixture: ComponentFixture<LookupComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(LookupComponent);
            component = fixture.componentInstance;
            element = fixture.nativeElement;

            component.formControlName = "single";
            component.lookupSuggestions = suggestions;
            component.searchTitle = "Localizador de país";
            component.searchGridData = gridData;
            component.searchFields = fields;
            component.searchTotalRecords = totalRecords;
            component.lookupDisplayField = "name";
            component.id = "lookupSingle";
            component.dataKey = "code";
            component.multiple = false;

            fixture.detectChanges();
        });

        it("should create", () => {
            expect(component).toBeTruthy();
        });
    });

    describe("Multiple", () => {
        let component: LookupComponent;
        let fixture: ComponentFixture<LookupComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(LookupComponent);
            component = fixture.componentInstance;
            element = fixture.nativeElement;

            component.formControlName = "multiple";
            component.lookupSuggestions = suggestions;
            component.searchTitle = "Localizador de país";
            component.searchGridData = gridData;
            component.searchFields = fields;
            component.searchTotalRecords = totalRecords;
            component.lookupDisplayField = "name";
            component.id = "lookupMultiple";
            component.dataKey = "code";
            component.multiple = true;

            fixture.detectChanges();
        });

        it("should create", () => {
            expect(component).toBeTruthy();
        });
    });
});
