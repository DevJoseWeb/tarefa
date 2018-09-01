import { Observable } from "rxjs";

import { FieldType } from "../../configurations/field-type";
import { Field, FieldConfig } from "../field";

export interface AutocompleteConfig extends FieldConfig {
    dataKey?: string;
    displayField?: string;
    multiple?: boolean;
    suggestionsObservable: Observable<any>;

    onSearch: (value: string) => void;
}

export class AutocompleteField extends Field {
    public dataKey: string;
    public displayField?: string;
    public multiple?: boolean;
    public suggestionsObservable: Observable<any>;
    public suggestions: any[] = [];

    public onSearch: (value: string) => void;

    constructor(config: AutocompleteConfig) {
        super({ ...config, type: FieldType.Autocomplete } as AutocompleteConfig);
        Object.assign(this, config);
        this.suggestionsObservable.subscribe(suggestions => (this.suggestions = suggestions));
    }
}
