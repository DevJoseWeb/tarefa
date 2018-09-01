import * as moment_ from "moment";
import { Component, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";

import { FieldType, FormField } from "../dynamic-form/index";
import { LocaleService } from "../locale/locale.service";
import { CustomFieldsService } from "./custom-fields.service";

const moment = moment_; // @HACK Necessary because of https://github.com/rollup/rollup/issues/670

@Component({
    selector: "s-custom-fields",
    templateUrl: "./custom-fields.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CustomFieldsComponent,
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CustomFieldsComponent,
            multi: true,
        },
    ],
})
export class CustomFieldsComponent implements OnInit, ControlValueAccessor, Validator {
    @Input() public domain: string;
    @Input() public service: string;
    @Input() public entity: string;
    @Input() public invalidErrorLabel: string;

    public fields: FormField[] = [];
    public formGroup: FormGroup;
    private ready = false;
    private onChange: any;
    private onTouched: any;
    private value: any;

    constructor(private customFieldsService: CustomFieldsService, private localeService: LocaleService) {}

    public registerOnChange(fn: Function) {
        this.onChange = fn;
        this.formGroup.valueChanges.subscribe(() => this.onChange(this.parseFieldsValues()));
    }

    public registerOnTouched(fn: Function) {
        this.onTouched = fn;
    }

    public writeValue(value: any) {
        if (this.ready) {
            const newValue = this.parseValuesForFields(value);
            this.formGroup.patchValue(newValue);
            this.value = newValue;
        } else {
            this.formGroup.patchValue(value || {});
            this.value = value;
        }
    }

    public setDisabledState(state: boolean) {
        if (state) this.formGroup.disable();
        else this.formGroup.enable();
    }

    public ngOnInit() {
        if (!this.domain) throw new Error("You need to specify the custom-fields domain!");
        if (!this.service) throw new Error("You need to specify the custom-fields service!");
        if (!this.entity) throw new Error("You need to specify the custom-fields entity!");

        this.formGroup = new FormGroup({});

        forkJoin(this.customFieldsService.getCustomFields(this.domain, this.service, this.entity), this.localeService.get()).subscribe(
            (response: any[]) => {
                const [customFieldsResponse, localeOptions] = response;

                const defaults: any = {};
                defaults[FieldType.String] = {};
                defaults[FieldType.Boolean] = { defaultValue: false };
                defaults[FieldType.Integer] = {};
                defaults[FieldType.Double] = { defaultMask: "" };
                defaults[FieldType.Money] = {};
                defaults[FieldType.Date] = {};
                defaults[FieldType.DateTime] = {};
                defaults[FieldType.Time] = {};

                if (!customFieldsResponse || !customFieldsResponse.entity_) return;
                const { active, fields } = customFieldsResponse.entity_;
                if (!active) return;

                fields
                    .filter((field: any) => field.customizable && field.customization && field.customization.active)
                    .forEach((field: any) => {
                        const formField = new FormField({
                            name: field.id,
                            label: field.customization.label,
                            tooltip: field.customization.tooltip,
                            type: field.type,
                            mask: field.customization.mask,
                            calendarOptions: localeOptions.calendar,
                            currencyOptions: localeOptions.currency,
                        });

                        const { validationRegex } = field.customization;

                        const asIsTypes = [FieldType.Boolean, FieldType.Money, FieldType.Date, FieldType.DateTime, FieldType.Time];

                        const validators = [];
                        if (validationRegex && asIsTypes.indexOf(formField.type) == -1)
                            validators.push(Validators.pattern(validationRegex));
                        if (formField.type === FieldType.Integer && !formField.mask) validators.push(Validators.pattern(/^\-?\d*$/));

                        const control = new FormControl(
                            { value: defaults[formField.type].defaultValue, disabled: this.formGroup.disabled },
                            validators
                        );

                        control.markAsDirty({ onlySelf: true });
                        this.formGroup.addControl(formField.name, control);
                        this.fields.push(formField);
                    });

                this.formGroup.patchValue(this.parseValuesForFields(this.value));
                this.formGroup.markAsDirty({ onlySelf: true });
                this.ready = true;
            }
        );
    }

    public validate() {
        const errors: any = {};
        Object.keys(this.formGroup.controls).forEach(field => {
            const { errors: controlErrors } = this.formGroup.get(field);
            if (controlErrors) errors[field] = controlErrors;
        });
        return errors;
    }

    private parseValuesForFields(values: any) {
        const parsedValues = { ...values };

        this.fields.forEach(field => {
            const { type, name } = field;
            const value = values && values[name];

            if (!value) return;

            switch (type) {
                case FieldType.Boolean:
                    if (value === "false") parsedValues[name] = false;
                    break;
                case FieldType.Date:
                    parsedValues[name] = moment(value).toDate();
                    break;
                case FieldType.DateTime:
                    parsedValues[name] = moment(value).toDate();
                    break;
                case FieldType.Time:
                    parsedValues[name] = moment(value, "HH:mm:ss").toDate();
                    break;
            }
        });

        return parsedValues;
    }

    private parseFieldsValues() {
        const parsedValues: any = {};

        this.fields.forEach(field => {
            const { type, name, mask } = field;
            let value = this.formGroup.get(name).value;

            if (value)
                switch (type) {
                    case FieldType.Integer:
                        if (mask) value = parseInt(value, 10);
                        break;
                    case FieldType.Double:
                        if (mask) value = parseFloat(value.replace(/\./g, "").replace(/,/g, "."));
                        break;
                    case FieldType.Date:
                        value = moment(value).format("YYYY-MM-DD");
                        break;
                    case FieldType.DateTime:
                        value = moment(value).format();
                        break;
                    case FieldType.Time:
                        value = moment(value).format("HH:mm:ss");
                        break;
                }

            if (value != null && !Number.isNaN(value)) parsedValues[name] = value;
        });

        return parsedValues;
    }
}
