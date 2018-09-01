import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";

import { countries } from "~resources/countries";
import { MultiSelectShowcaseService } from "./multi-select-showcase.service";

@Component({
    templateUrl: "./multi-select-showcase.component.html",
})
export class MultiSelectShowcaseComponent implements OnInit {
    public formGroup: FormGroup;
    public suggestions = countries.map(country => ({ label: country.name, value: country }));

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        public multiSelectShowcaseService: MultiSelectShowcaseService
    ) {}

    public ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.formGroup = this.formBuilder.group({
            countries: [{ value: undefined, disabled: false }],
            countriesRequired: [{ value: undefined, disabled: false }, [Validators.required]],
        });
    }

    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) control.markAsDirty({ onlySelf: true });
            else if (control instanceof FormGroup) this.validateAllFormFields(control);
        });
    }

    public save() {
        if (!this.formGroup.valid) return this.validateAllFormFields(this.formGroup);

        const data = this.formGroup.value;
        console.log(data);

        this.messageService.add({
            severity: `success`,
            summary: `Salvou`,
            detail: `O formulário foi salvo. Verifique os dados no console.`,
        });
    }

    public clear() {
        this.formGroup.reset();
    }

    public autoCompleteRequest(value: string) {
        this.multiSelectShowcaseService.getCountries(value).then((payload: any) => {
            this.suggestions = payload.data;
        });
    }
}
