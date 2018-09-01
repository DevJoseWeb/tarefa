import { CommonModule } from "@angular/common";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";

import { LocaleService } from "./locale.service";
import { LocalizedCurrencyPipe } from "./pipes/localized-currency.pipe";
import { LocalizedDatePipe } from "./pipes/localized-date.pipe";
import { LocalizedTimePipe } from "./pipes/localized-time.pipe";

@NgModule({
    imports: [CommonModule],
    exports: [LocalizedCurrencyPipe, LocalizedDatePipe, LocalizedTimePipe],
    declarations: [LocalizedCurrencyPipe, LocalizedDatePipe, LocalizedTimePipe],
})
export class LocaleModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: LocaleModule,
            providers: [LocaleService, LocalizedCurrencyPipe, LocalizedDatePipe, LocalizedTimePipe],
        };
    }

    public static forChild(): ModuleWithProviders {
        return {
            ngModule: LocaleModule,
        };
    }
}
