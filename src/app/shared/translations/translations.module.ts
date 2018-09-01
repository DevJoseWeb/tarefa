import { Injector, NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LOCATION_INITIALIZED } from "@angular/common";
import { user } from "@seniorsistemas/senior-platform-data";

import * as fallback from "src/locale/pt-BR.json";
import { environment } from "~src/environments/environment";

@NgModule({
    imports: [HttpClientModule, TranslateModule.forRoot()],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TranslateService, Injector, HttpClient],
            multi: true,
        },
    ],
})
export class TranslationsModule {}

export function appInitializerFactory(translate: TranslateService, injector: Injector, http: HttpClient) {
    return () =>
        new Promise<any>((resolve: any) => {
            const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

            locationInitialized.then(async () => {
                translate.setTranslation("fallback", fallback);
                translate.setDefaultLang("fallback");

                try {
                    const params = new HttpParams()
                        .set("domainName", environment.project.domain)
                        .set("serviceName", environment.project.service)
                        .set("format", "FLAT_JSON");

                    const headers = new HttpHeaders().set("Authorization", await user.getAuthHeader());

                    let url = "platform/translation_hub/queries/getTranslationBundle";
                    const bundlesPromise = http
                        .get(url, { headers, params })
                        .toPromise()
                        .then((res: any) => res.bundleFiles);
                    const userDataPromise = user.getUserData();
                    const [bundles, userData]: any = await Promise.all([bundlesPromise, userDataPromise]);

                    let userLanguage = userData.localidade && bundles.find((bundle: any) => bundle.language == userData.localidade);
                    if (!userLanguage) userLanguage = bundles.find((bundle: any) => bundle.language == "pt-BR");
                    if (!userLanguage) return resolve();

                    url = userLanguage.url;
                    const translation = await http.get(url).toPromise();
                    translate.setTranslation(userLanguage.language, translation);
                    await translate.use(userLanguage.language).toPromise();

                    resolve();
                } catch (err) {
                    console.warn("Error getting translation bundles. Using fallback.", (err && err.message) || "");
                    await translate.use("fallback").toPromise();
                    resolve();
                }
            });
        });
}
