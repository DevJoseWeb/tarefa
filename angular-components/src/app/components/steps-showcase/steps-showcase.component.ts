import { Component } from "@angular/core";
import { Step, StepState, StepSelectionEvent } from "@seniorsistemas/angular-components";

@Component({
    templateUrl: "./steps-showcase.component.html",
    styleUrls: ["./steps-showcase.component.scss"],
})
export class StepsShowcaseComponent {
    public steps: Step[] = [
        {
            id: "1",
            label: "Step 1",
            description: "Descrição detalhada do Step 1",
            disabled: false,
            state: StepState.Success,
        },
        {
            id: "2",
            label: "Step 2",
            description: "Descrição detalhada do Step 2",
            disabled: false,
            state: StepState.Warning,
        },
        {
            id: "3",
            label: "Step 3",
            description: "Descrição detalhada do Step 3",
            disabled: false,
        },
        {
            id: "4",
            label: "Step 4",
            description: "Descrição detalhada do Step 4",
            disabled: false,
        },
        {
            id: "5",
            label: "Step 5",
            description: "Descrição detalhada do Step 5",
            disabled: true,
        },
    ];

    public linear = true;
    public activeIndex = 3;
    public stateOptions = [
        { label: "Default", value: StepState.Default },
        { label: "Success", value: StepState.Success },
        { label: "Warning", value: StepState.Warning },
    ];

    public stepSelected(event: StepSelectionEvent) {
        this.changeStep(event.index);
    }

    public onLinearChange(event: any) {
        this.steps.forEach((step, i) => (step.disabled = event.checked && i > this.activeIndex));
    }

    public changeStep(index: number) {
        this.activeIndex = index;
        if (this.linear) this.steps.forEach((step, i) => (step.disabled = i > this.activeIndex));
    }
}
