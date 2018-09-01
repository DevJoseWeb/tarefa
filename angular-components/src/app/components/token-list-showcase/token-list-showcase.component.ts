import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";

import { FieldType, FormField, IToken } from "@seniorsistemas/angular-components";

@Component({
    templateUrl: `./token-list-showcase.component.html`,
})
export class TokenListShowcaseComponent implements OnInit {
    public filtersForm: FormGroup;
    public searchFields: FormField[];
    public currentSearch: any = {};
    public searchTokens: IToken[];

    constructor(private messageService: MessageService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.searchFields = [
            new FormField({
                name: "id",
                label: "Id",
                type: FieldType.Integer,
            }),
            new FormField({
                name: "name",
                label: "Nome",
                type: FieldType.String,
            }),
            new FormField({
                name: "email",
                label: "Email",
                type: FieldType.String,
            }),
        ];

        this.filtersForm = this.formBuilder.group({
            id: [300],
            name: ["Tiago Dionesto"],
            email: ["tiago.dionesto@senior.com.br"],
        });

        this.updateCurrentSearch();
    }

    select(token: IToken) {
        this.messageService.add({
            severity: "info",
            summary: "Token selecionado",
            detail: `Id: ${token.id}, Label: ${token.label}`,
        });
    }

    remove(token: IToken) {
        this.messageService.add({
            severity: "warn",
            summary: "Token removido",
            detail: `Id: ${token.id}, Label: ${token.label}`,
        });
        this.filtersForm.get(token.id).setValue(undefined);
        this.updateCurrentSearch();
    }

    generate() {
        this.updateCurrentSearch();
    }

    clear() {
        this.filtersForm.reset();
        this.updateCurrentSearch();
    }

    updateCurrentSearch() {
        this.currentSearch = this.filtersForm.getRawValue();
        this.searchTokens = this.searchFields
            .filter(field => this.currentSearch[field.name])
            .map(field => ({ id: field.name, label: `${field.label}: ${this.currentSearch[field.name]}` }));
    }
}
