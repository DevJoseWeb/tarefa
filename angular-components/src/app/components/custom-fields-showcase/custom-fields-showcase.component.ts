import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
    templateUrl: "./custom-fields-showcase.component.html",
})
export class CustomFieldsShowcaseComponent implements OnInit {
    public formGroup: FormGroup;
    public showCustom = false;

    constructor(private formBuilder: FormBuilder, private messageService: MessageService) {}

    ngOnInit() {
        this.createForm();
    }

    save() {
        if (!this.formGroup.valid) return this.validateAllFormFields(this.formGroup);

        const data = this.formGroup.value;
        console.log(data);

        this.messageService.add({
            severity: `success`,
            summary: `Salvou`,
            detail: `O formulário foi salvo. Verifique os dados no console.`,
        });
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) control.markAsDirty({ onlySelf: true });
            else if (control instanceof FormGroup) this.validateAllFormFields(control);
        });
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            id: [{ value: 100, disabled: false }, [Validators.required, Validators.pattern(/^\-?\d*$/)]],
            atributoInteger: [{ value: 50, disabled: false }, [Validators.required, Validators.pattern(/^\-?\d*$/)]],
            atributoDouble: [{ value: 50.5, disabled: true }, []],
            atributoBoolean: [{ value: true, disabled: false }, [Validators.required]],
            atributoString: [{ value: `String teste`, disabled: false }, [Validators.required]],
            custom: [{ value: { name: "Dchecica Dias", twitter: "@dchecica" }, disabled: false }],
        });
    }
}
