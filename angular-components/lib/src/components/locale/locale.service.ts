import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { user } from "@seniorsistemas/senior-platform-data";
import * as moment_ from "moment";
import { from, Observable, of } from "rxjs";
import { catchError, flatMap, map } from "rxjs/operators";

import { DEFAULT_CALENDAR_OPTIONS, DEFAULT_CURRENCY_OPTIONS, LocaleOptions } from "./locale";

const moment = moment_; // @HACK Necessary because of https://github.com/rollup/rollup/issues/670

@Injectable()
export class LocaleService {
    private localeOptionsAddress = `https://cdn.senior.com.br/primeng/locales`;
    private localeOptionsVersion = `2.1.1`;
    private localeOptions: LocaleOptions;
    private observable: Observable<LocaleOptions>;

    constructor(private http: HttpClient) {}

    public get(): Observable<LocaleOptions> {
        if (this.localeOptions) this.observable = of(this.localeOptions);
        else if (!this.observable) {
            this.observable = this.getLocaleConfig().pipe(map((localeOptions: LocaleOptions) => (this.localeOptions = localeOptions)));
        }
        return this.observable;
    }

    private getLocaleConfig() {
        return from(user.getUserData()).pipe(
            flatMap((userData: any) => {
                const locale = userData.localidade || `pt-BR`;
                moment.locale(locale);
                return this.http.get(`${this.localeOptionsAddress}/${this.localeOptionsVersion}/${locale}.json`);
            }),
            catchError((err: any) => {
                console.warn(`Error getting locale configuration. Using fallback.`, err);
                return of({
                    calendar: DEFAULT_CALENDAR_OPTIONS,
                    currency: DEFAULT_CURRENCY_OPTIONS,
                });
            })
        );
    }
}
