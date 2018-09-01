import { Component, OnInit } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from "@angular/router";
import { MenuItem } from "primeng/components/common/api";

import { environment } from "~env/environment";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    public pageLoading = true;
    public items: MenuItem[];

    constructor(private router: Router) {}

    public ngOnInit() {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationStart) {
                this.pageLoading = true;
            } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.pageLoading = false;
            }
        });

        this.items = [
            { label: "Breadcrumb", routerLink: "breadcrumb" },
            { separator: true },
            { label: "Button", routerLink: "button" },
            { separator: true },
            { label: "Control Errors", routerLink: "control-errors" },
            { separator: true },
            { label: "Custom Fields", routerLink: "custom-fields" },
            { separator: true },
            { label: "Dynamic Form", routerLink: "dynamic-form" },
            { separator: true },
            { label: "Empty State", routerLink: "empty-state" },
            { separator: true },
            { label: "Fieldset", routerLink: "fieldset" },
            { separator: true },
            { label: "Loading State", routerLink: "loading-state" },
            { separator: true },
            { label: "Lookup", routerLink: "lookup" },
            { separator: true },
            { label: "Multi Select", routerLink: "multi-select" },
            { separator: true },
            { label: "Sidebar", routerLink: "sidebar" },
            { separator: true },
            { label: "Tab", routerLink: "tab" },
            { separator: true },
            { label: "Table", routerLink: "table" },
            { separator: true },
            { label: "Stats Card", routerLink: "stats-card" },
            { separator: true },
            { label: "Steps", routerLink: "steps" },
            { separator: true },
            { label: "Token", routerLink: "token" },
        ];
    }
}
