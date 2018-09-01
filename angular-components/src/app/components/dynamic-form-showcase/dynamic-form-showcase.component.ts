import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FieldType, FormField } from "@seniorsistemas/angular-components";
import { MessageService } from "primeng/components/common/messageservice";
import { BehaviorSubject } from "rxjs";

import { countries } from "~resources/countries";

@Component({
    templateUrl: "./dynamic-form-showcase.component.html",
})
export class DynamicFormShowcaseComponent implements OnInit {
    public formGroup: FormGroup;
    public error: string;
    public countriesObservable: BehaviorSubject<any> = new BehaviorSubject([]);

    public fields: any[] = [
        {
            name: "string",
            type: FieldType.String,
            label: "String",
            tooltip: "String",
            size: { xl: 3 },
        },
        {
            name: "enum",
            type: FieldType.Enum,
            label: "Enum",
            options: [
                { label: "Opção 1", value: "1" },
                { label: "Opção 2", value: "2" },
                { label: "Opção 3", value: "3" },
                { label: "Opção 4", value: "4" },
            ],
            size: { xl: 3 },
        },
        {
            name: "integer",
            type: FieldType.Integer,
            label: "Integer",
            tooltip: "Integer",
            required: true,
            size: { xl: 3 },
        },
        {
            name: "double",
            type: FieldType.Double,
            label: "Double",
            tooltip: "Double",
            size: { xl: 3 },
        },
        {
            name: "date",
            type: FieldType.Date,
            label: "Date",
            tooltip: "Date",
        },
        {
            name: "dateTime",
            type: FieldType.DateTime,
            label: "DateTime",
            tooltip: "DateTime",
        },
        {
            name: "time",
            type: FieldType.Time,
            label: "Time",
            tooltip: "Time",
        },
        {
            name: "money",
            type: FieldType.Money,
            label: "Money",
            tooltip: "Money",
        },
        {
            name: "autocomplete",
            type: FieldType.Autocomplete,
            multiple: true,
            label: "Autocomplete",
            tooltip: "Autocomplete",
            fullWidth: true,
            dataKey: "code",
            onSearch: (val: string) => {
                const filtered = countries.filter(country => country.name.match(new RegExp(val, "ig")));
                this.countriesObservable.next(filtered);
            },
            suggestionsObservable: this.countriesObservable,
            displayField: "name",
        },
        {
            name: "boolean",
            type: FieldType.Boolean,
            label: "Boolean",
            tooltip: "Boolean",
        },
    ];

    public dynamicFormFields: FormField[] = this.fields.map(field => new FormField(field));

    public get fieldsConfig() {
        const fields = this.fields.filter(field => field.type !== FieldType.Autocomplete);
        return JSON.stringify(fields, null, 4);
    }

    public set fieldsConfig(value) {
        try {
            this.fields = JSON.parse(value);
            this.dynamicFormFields = this.fields.map(field => new FormField(field));
            this.createForm();
            this.error = "";
        } catch (err) {
            this.error = `Invalid configuration: \n${err}`;
        }
    }

    constructor(private formBuilder: FormBuilder, private messageService: MessageService) {}

    public ngOnInit() {
        this.createForm();
    }

    public createForm() {
        const group = this.fields.reduce((result, field) => {
            result[field.name] = new FormControl();
            return result;
        }, {});

        this.formGroup = new FormGroup(group);
    }

    public save() {
        if (!this.formGroup.valid) return this.validateAllFormFields(this.formGroup);

        const data = this.formGroup.value;
        console.info(data);

        this.messageService.add({
            severity: `success`,
            summary: `Salvou`,
            detail: `O formulário foi salvo. Verifique os dados no console.`,
        });
    }

    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) control.markAsDirty({ onlySelf: true });
            else if (control instanceof FormGroup) this.validateAllFormFields(control);
        });
    }
}
