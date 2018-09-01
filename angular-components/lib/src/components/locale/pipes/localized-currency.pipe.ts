import { Pipe, PipeTransform } from "@angular/core";
import { LocaleService } from "../locale.service";
import { of } from "rxjs/observable/of";
import { map } from "rxjs/operators";

@Pipe({
    name: `localizedCurrency`,
    pure: false,
})
export class LocalizedCurrencyPipe implements PipeTransform {
    constructor(private localeService: LocaleService) {}

    public transform(value?: any, options: any = {}): any {
        return value !== undefined && value !== null ? this.applyMask(value, options) : of(value);
    }

    private applyMask(value: any, options: any) {
        return this.localeService.get().pipe(
            map((localeConfig: any) => {
                const currency = { ...localeConfig.currency, ...options };
                const { precision, prefix, suffix, thousands, decimal } = currency;

                const rawValue = Number(value).toFixed(precision);
                const onlyNumbers = rawValue.replace(/[^0-9]/g, ``);
                const integerPart =
                    onlyNumbers
                        .slice(0, onlyNumbers.length - precision)
                        .replace(/^0*/g, ``)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, thousands) || `0`;
                const decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);
                const newValue = integerPart + decimal + decimalPart;
                const isZero = !Number(onlyNumbers);
                const operator = rawValue.includes(`-`) && !isZero ? `-` : ``;
                return operator + prefix + newValue + suffix;
            })
        );
    }
}
