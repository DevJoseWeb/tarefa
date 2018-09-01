import { FormGroup } from "@angular/forms";
import { Component, Input } from "@angular/core";

import { FormField } from "./form-field";

@Component({
    selector: `s-dynamic-form`,
    templateUrl: `./dynamic-form.component.html`,
})
export class DynamicFormComponent {
    @Input() fields: FormField[];
    @Input() form: FormGroup;
    @Input() errorMessages?: any = {};
}
