import { CurrencyOptions, DEFAULT_CURRENCY_OPTIONS } from "../../locale/locale";
import { Field, FieldConfig } from "./field";

export interface CurrencyConfig extends FieldConfig {
    currencyOptions?: CurrencyOptions;
}

export class CurrencyField extends Field {
    public currencyOptions: CurrencyOptions;

    constructor(config: CurrencyConfig) {
        super(config);
        this.currencyOptions = config.currencyOptions || DEFAULT_CURRENCY_OPTIONS;
    }
}
