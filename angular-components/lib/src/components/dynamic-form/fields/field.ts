import { FieldType } from "../configurations/field-type";
import { FieldSize } from "../configurations/field-size";

export interface FieldConfig {
    name: string;
    label: string;
    tooltip?: string;
    placeholder?: string;
    type?: FieldType;
    size?: FieldSize;
}

export abstract class Field {
    public name: string;
    public label: string;
    public tooltip?: string;
    public placeholder?: string;
    public type: FieldType;
    public size: FieldSize;
    public gridClass: string[];

    constructor(config: FieldConfig) {
        this.name = config.name;
        this.label = config.label;
        this.tooltip = config.tooltip;
        this.placeholder = config.placeholder || "";
        this.type = config.type;
        this.size = new FieldSize(config.size || {});
        this.gridClass = Object.keys(this.size).map(key => `ui-${key}-${this.size[key]}`);
    }
}
