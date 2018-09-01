import { Injectable } from "@angular/core";
import { MessageService } from "primeng/components/common/messageservice";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "moment";

@Injectable({
    providedIn: "root"
})
export class CommonFunctions {
    constructor(
        private messageService: MessageService,
        private translateService: TranslateService,
    ) { }

    public errorHandler(response: any) {
        this.messageService.add({
            severity: "error",
            summary: response.status === 400 ? "" : this.translateService.instant("error"),
            detail: response.error ? response.error.message : response
        });
    }

    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) control.markAsDirty({ onlySelf: true });
            else if (control instanceof FormGroup) this.validateAllFormFields(control);
        });
    }

    public converterData(data: string) {
        if(!data) return;
        return moment(data).format("YYYY-MM-DD")
    }
}
