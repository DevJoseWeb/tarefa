import { CalendarOptions, CurrencyOptions } from "../locale/locale";
import { AutocompleteField } from "./fields/autocomplete-field/autocomplete-field";
import { FieldType } from "./configurations/field-type";
import { CalendarField } from "./fields/calendar-field";
import { CheckboxField } from "./fields/checkbox-field";
import { CurrencyField } from "./fields/currency-field";
import { NumericField } from "./fields/numeric-field";
import { SelectField } from "./fields/select-field";
import { TextField } from "./fields/text-field";

export class FormField {
    name?: string;
    type?: FieldType;
    label?: string;
    tooltip?: string;
    mask?: string;
    placeholder?: string;
    options?: Option[];
    calendarOptions?: CalendarOptions;
    currencyOptions?: CurrencyOptions;

    constructor(config: any) {
        switch (config.type) {
            case FieldType.Enum:
                return new SelectField(config);
            case FieldType.Autocomplete:
                return new AutocompleteField(config);
            case FieldType.Money:
                return new CurrencyField(config);
            case FieldType.Integer:
            case FieldType.Double:
                return new NumericField(config);
            case FieldType.String:
            case FieldType.Binary:
                return new TextField(config);
            case FieldType.Boolean:
                return new CheckboxField(config);
            case FieldType.Date:
            case FieldType.DateTime:
            case FieldType.Time:
                return new CalendarField(config);
        }
    }
}

export class Option {
    label: string;
    value?: any;

    constructor(label: string, value: any) {
        this.label = label;
        this.value = value;
    }
}
