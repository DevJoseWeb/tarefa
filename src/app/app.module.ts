import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { GrowlModule } from "primeng/growl";
import { MessageService } from "primeng/components/common/messageservice";
import { ConfirmationService } from 'primeng/api';
import {
    HttpInterceptorModule,
    CyclicJsonInterceptorModule,
    LocaleModule,
    RestUrl,
    BreadcrumbModule,
} from "@seniorsistemas/angular-components";
import { of } from "rxjs";

import { environment } from "~environments/environment";
import { TranslationsModule } from "~shared/translations/translations.module";
import { PermissionsModule } from "~shared/permissions/permissions.module";
import { CoreModule } from "~core/core.module";
import { FeaturesModule } from "~features/features.module";
import { AppComponent } from "~app/app.component";

export class CustomRestUrl {
    get() {
        return of(environment.restUrl);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([], { paramsInheritanceStrategy: "always", preloadingStrategy: PreloadAllModules, useHash: true }),
        HttpClientModule,
        ReactiveFormsModule,
        HttpInterceptorModule,
        CyclicJsonInterceptorModule,
        LocaleModule.forRoot(),
        PermissionsModule.forRoot(),
        BreadcrumbModule,
        GrowlModule,
        TranslationsModule,
        FeaturesModule,
        CoreModule,
    ],
    declarations: [AppComponent],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: RestUrl, useFactory: () => (!environment.production && environment.restUrl ? new CustomRestUrl() : new RestUrl()) },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
