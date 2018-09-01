import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FieldType, FormField, TextField } from "@seniorsistemas/angular-components";

@Component({
    templateUrl: "./fieldset-showcase.component.html",
})
export class FieldsetShowcaseComponent implements OnInit {
    public formGroup: FormGroup;
    public dynamicFormFields: FormField[] = [
        new TextField({ name: "1", label: "Campo 1", type: FieldType.String }),
        new TextField({ name: "2", label: "Campo 2", type: FieldType.String }),
        new TextField({ name: "3", label: "Campo 3", type: FieldType.String }),
        new TextField({ name: "4", label: "Campo 4", type: FieldType.String }),
    ];

    public ngOnInit() {
        const group: any = this.dynamicFormFields.reduce((result, field) => {
            result[field.name] = new FormControl();
            return result;
        }, {});

        this.formGroup = new FormGroup(group);
    }
}
