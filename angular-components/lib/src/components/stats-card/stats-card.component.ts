import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "s-stats-card",
    templateUrl: "./stats-card.component.html",
    styleUrls: ["./stats-card.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class StatsCardComponent {
    public static nextId = 0;

    @Input() public id = `s-stats-card-${StatsCardComponent.nextId++}`;
    @Input() public label: string;
    @Input() public lightMode = true;
    @Input() public iconClass = "fa fa-bar-chart";
    @Input() public color = "#339966";

    @Input()
    public set value(value: string) {
        this.previousValue = this._value;
        this._value = String(value);
        this.updateDisplayValue();
    }

    public get value() {
        return this._value;
    }

    public displayValue: string;

    private ANIMATION_DURATION_MS = 200;
    private STEP_DURATION_MS = 20;
    private previousValue = "0";
    private intervalId: any;
    private _value = "0";

    private updateDisplayValue() {
        const previousRawValue = Number(this.previousValue.replace(/[^\d]/g, ""));
        const rawValue = Number(this.value.replace(/[^\d]/g, ""));
        const incrementValue = Math.ceil(Math.abs(rawValue - previousRawValue) / (this.ANIMATION_DURATION_MS / this.STEP_DURATION_MS));
        const incremental = previousRawValue < rawValue;

        clearInterval(this.intervalId);
        this.displayValue = this.replaceNumericPositions(this.value);
        let counter = previousRawValue;

        this.intervalId = setInterval(() => {
            if (incremental && counter < rawValue) {
                this.displayValue = this.replaceNumericPositions(this.displayValue, String(counter));
                counter += incrementValue;
            } else if (incremental) {
                this.displayValue = this.value;
                clearInterval(this.intervalId);
            } else if (!incremental && counter > rawValue) {
                this.displayValue = this.replaceNumericPositions(this.displayValue, String(counter));
                counter -= incrementValue;
            } else if (!incremental) {
                this.displayValue = this.value;
                clearInterval(this.intervalId);
            }
        }, this.STEP_DURATION_MS);
    }

    public replaceNumericPositions(value: string, newValue: string = "") {
        const rawValue = value.replace(/[^\d]/g, "");
        const newValueString = newValue.replace(/[^\d]/g, "").padStart(rawValue.length, "0");
        let newValueIndex = 0;

        return value
            .split("")
            .map(char => {
                const number = Number(char);
                if (number || char === "0") return newValueString[newValueIndex++];
                return char;
            })
            .join("");
    }
}
