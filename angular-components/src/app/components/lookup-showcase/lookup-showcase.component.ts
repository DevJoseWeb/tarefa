import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FieldType, FormField } from "@seniorsistemas/angular-components";
import { MessageService } from "primeng/components/common/messageservice";

import { countries } from "~resources/countries";
import { LookupShowcaseService } from "./lookup-showcase.service";

@Component({
    templateUrl: "./lookup-showcase.component.html",
})
export class LookupShowcaseComponent implements OnInit {
    public formGroup: FormGroup;

    public suggestions: any;
    public gridData: any;
    public totalRecords = 0;

    public templateForm: { id?: any; single?: any; multiple?: any } = {};

    public fields = [
        new FormField({
            name: "name",
            label: "Nome",
            type: FieldType.String,
        }),
        new FormField({
            name: "code",
            label: "Código",
            type: FieldType.Enum,
            options: countries.map(({ code }) => ({ label: code, value: code })),
        }),
    ];

    public gridFields = [
        new FormField({
            name: "name",
            label: "Nome do país",
            type: FieldType.String,
        }),
        new FormField({
            name: "code",
            label: "Código do país",
            type: FieldType.String,
        }),
    ];

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        public lookupShowcaseService: LookupShowcaseService
    ) {}

    public ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.formGroup = this.formBuilder.group({
            single: [{ value: { name: "Brazil", code: "BR" }, disabled: false }, [Validators.required]],
            multiple: [{ value: undefined, disabled: false }, [Validators.required]],
            withoutSearch: [{ value: undefined, disabled: false }, [Validators.required]],
        });
    }

    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) control.markAsDirty({ onlySelf: true });
            else if (control instanceof FormGroup) this.validateAllFormFields(control);
        });
    }

    public save() {
        if (!this.formGroup.valid) return this.validateAllFormFields(this.formGroup);

        const data = this.formGroup.value;
        console.log(data);

        this.messageService.add({
            severity: `success`,
            summary: `Salvou`,
            detail: `O formulário foi salvo. Verifique os dados no console.`,
        });
    }

    public clear() {
        this.formGroup.reset();
    }

    public saveTemplate(single: any, multiple: any) {
        if (!single.valid || !multiple.valid) {
            single.control.markAsDirty();
            multiple.control.markAsDirty();
            return;
        }

        console.log(this.templateForm);

        this.messageService.add({
            severity: `success`,
            summary: `Salvou`,
            detail: `O formulário foi salvo. Verifique os dados no console.`,
        });
    }

    public autoCompleteRequest(value: string) {
        this.lookupShowcaseService.getCountries(value).then((payload: any) => {
            this.suggestions = payload.data;
        });
    }

    public gridRequest(event: any) {
        const { first, rows, filterData, multiSortMeta } = event;
        const page = first / rows + 1;
        this.lookupShowcaseService.queryFilterCountry(filterData, page, multiSortMeta).then((payload: any) => {
            this.gridData = payload.data;
            this.totalRecords = payload.totalRecords;
        });
    }
}
