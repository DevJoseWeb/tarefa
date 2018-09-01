import { FormControl } from "@angular/forms";
import { Component, Input } from "@angular/core";

@Component({
    selector: `s-control-errors`,
    templateUrl: `./control-errors.component.html`,
})
export class ControlErrorsComponent {
    public static nextId = 0;

    @Input() id = `s-control-errors-${ControlErrorsComponent.nextId++}`;
    @Input() control: FormControl;
    @Input() errorMessages: any = {};
    @Input() form: any;

    getErrorMessagesList() {
        if (!this.control || !this.control.dirty) return [];
        return Object.keys(this.control.errors || {}).map(error => this.errorMessages[error]);
    }
}
