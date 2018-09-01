import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "s-steps",
    templateUrl: "./steps.component.html",
    styleUrls: ["./steps.component.scss"],
})
export class StepsComponent {
    public static nextId = 0;

    @Input() public id = `s-steps-${StepsComponent.nextId++}`;
    @Input() public steps: Step[];
    @Input() public activeIndex = 0;

    @Output() public stepSelected: EventEmitter<StepSelectionEvent> = new EventEmitter();

    public stepClick(step: Step, index: number, event: any) {
        if (step.disabled || index == this.activeIndex) return;
        this.stepSelected.emit({ step, index, event });
    }
}

export interface Step {
    id: any;
    label: string;
    description?: string;
    state?: StepState;
    disabled?: boolean;
}

export enum StepState {
    Default = "default",
    Success = "success",
    Warning = "warning",
}

export interface StepSelectionEvent {
    step: Step;
    index: number;
    event: any;
}
