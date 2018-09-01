import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    templateUrl: "./control-errors-showcase.component.html",
})
export class ControlErrorsShowcaseComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    public ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.formGroup = this.formBuilder.group({
            nome: [{ value: undefined, disabled: false }, [Validators.required, Validators.minLength(3)]],
            idade: [{ value: undefined, disabled: false }, [Validators.required, Validators.min(18), Validators.max(120)]],
            email: [{ value: undefined, disabled: false }, [Validators.email, Validators.pattern(/.*(sfrufles).*/i)]],
        });
    }
}
