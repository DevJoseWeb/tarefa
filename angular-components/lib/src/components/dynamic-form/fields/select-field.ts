import { Field, FieldConfig } from "./field";

export interface SelectConfig extends FieldConfig {
    options: SelectOption[];
    multiple?: boolean;
}

export class SelectField extends Field {
    public options: SelectOption[];
    public multiple?: boolean;

    constructor(config: SelectConfig) {
        super(config);
        this.options = config.options;
        this.multiple = config.multiple;
    }
}

export class SelectOption {
    label: string;
    value?: any;

    constructor(config: SelectOption) {
        this.label = config.label;
        this.value = config.value;
    }
}
