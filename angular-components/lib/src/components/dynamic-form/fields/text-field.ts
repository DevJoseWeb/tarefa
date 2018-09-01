import { Field, FieldConfig } from "./field";

export interface TextConfig extends FieldConfig {
    mask?: string;
}

export class TextField extends Field {
    public mask?: string;

    constructor(config: TextConfig) {
        super(config);
        this.mask = config.mask;
    }
}
