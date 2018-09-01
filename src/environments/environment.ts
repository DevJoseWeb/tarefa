import { environment as def } from "~src/environments/environment.default";

export const environment: any = {
    ...def,
    // restUrl: "https://NOME_COMPUTADOR.interno.senior.com.br:PORTA/",
    restUrl: "http://teste11:9090/bridge/rest/",
    ignorePermissions: true,
};

import "zone.js/dist/zone-error";
