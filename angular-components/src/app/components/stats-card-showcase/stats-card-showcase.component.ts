import { Component } from "@angular/core";

@Component({
    templateUrl: `./stats-card-showcase.component.html`,
    styleUrls: ["./stats-card-showcase.component.scss"],
})
export class StatsCardShowcaseComponent {
    public lightMode = true;
    public showPanels = true;

    public totalSalary = 15120000.5;
    public totalRaises = 200.123;
    public raisesToApprove = 120.0;
    public employeesWithChange = 75;

    public partialDelayIndex = "94,25%";
    public generalDelayIndex = "7,89%";
    public litigationIndex = "0.00%";

    public receiptIndex = "92,68%";

    public clientPaymentRate = "28,5 dias";
    public providerPaymentRate = "35,2 dias";

    public changeValues() {
        this.totalSalary = this.randomInteger();
        this.totalRaises = this.randomInteger();
        this.raisesToApprove = this.randomInteger();
        this.employeesWithChange = this.randomInteger(1, 100000);
    }

    private randomInteger(min = 1, max = 1000000000) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
