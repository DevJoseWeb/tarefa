import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import {
    BreadcrumbModule,
    ButtonModule,
    DEFAULT_CALENDAR_OPTIONS,
    DEFAULT_CURRENCY_OPTIONS,
    LoadingStateModule,
    LocaleModule,
    LocaleService,
} from "@seniorsistemas/angular-components";
import { ToastModule } from "primeng/toast";
import { MenuModule } from "primeng/menu";
import { ConfirmationService } from "primeng/api";
import { of } from "rxjs";

import { AppComponent } from "./app.component";
import { BreadcrumbShowcaseModule } from "./components/breadcrumb-showcase/breadcrumb-showcase.module";
import { ButtonShowcaseModule } from "./components/button-showcase/button-showcase.module";
import { ControlErrorsShowcaseModule } from "./components/control-errors-showcase/control-errors-showcase.module";
import { CustomFieldsShowcaseModule } from "./components/custom-fields-showcase/custom-fields-showcase.module";
import { DynamicFormShowcaseModule } from "./components/dynamic-form-showcase/dynamic-form-showcase.module";
import { EmptyStateShowcaseModule } from "./components/empty-state-showcase/empty-state-showcase.module";
import { FieldsetShowcaseModule } from "./components/fieldset-showcase/fieldset-showcase.module";
import { LoadingStateShowcaseModule } from "./components/loading-state-showcase/loading-state-showcase.module";
import { LookupShowcaseModule } from "./components/lookup-showcase/lookup-showcase.module";
import { MultiSelectShowcaseModule } from "./components/multi-select-showcase/multi-select-showcase.module";
import { SidebarShowcaseModule } from "./components/sidebar-showcase/sidebar-showcase.module";
import { StatsCardShowcaseModule } from "./components/stats-card-showcase/stats-card-showcase.module";
import { StepsShowcaseModule } from "./components/steps-showcase/steps-showcase.module";
import { TabShowcaseModule } from "./components/tab-showcase/tab-showcase.module";
import { TableShowcaseModule } from "./components/table-showcase/table-showcase.module";
import { TokenListShowcaseModule } from "./components/token-list-showcase/token-list-showcase.module";

export class LocaleServiceMock extends LocaleService {
    public get() {
        return of({
            calendar: DEFAULT_CALENDAR_OPTIONS,
            currency: DEFAULT_CURRENCY_OPTIONS,
        });
    }
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MenuModule,
        ToastModule,
        BreadcrumbModule,
        ButtonModule,
        LocaleModule.forRoot(),
        ButtonShowcaseModule,
        LoadingStateModule,
        BreadcrumbShowcaseModule,
        ControlErrorsShowcaseModule,
        CustomFieldsShowcaseModule,
        DynamicFormShowcaseModule,
        EmptyStateShowcaseModule,
        FieldsetShowcaseModule,
        LoadingStateShowcaseModule,
        LookupShowcaseModule,
        MultiSelectShowcaseModule,
        SidebarShowcaseModule,
        TabShowcaseModule,
        TableShowcaseModule,
        StatsCardShowcaseModule,
        StepsShowcaseModule,
        TokenListShowcaseModule,
    ],
    providers: [{ provide: LocaleService, useClass: LocaleServiceMock }, ConfirmationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
