import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: `s-empty-state`,
    templateUrl: `./empty-state.component.html`,
    styleUrls: ["./empty-state.component.css"],
})
export class EmptyStateComponent {
    public static nextId = 0;

    @Input() id = `s-empty-state-${EmptyStateComponent.nextId++}`;
    @Input() iconClass = "fa fa-inbox";
    @Input() title: string;
    @Input() description?: string;
    @Input() showPrimaryAction = true;
    @Input() showSecondaryAction = true;
    @Input() primaryActionLabel?: string;
    @Input() secondaryActionLabel?: string;

    @Output() primaryAction = new EventEmitter();
    @Output() secondaryAction = new EventEmitter();
}
