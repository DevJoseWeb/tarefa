import { Component } from "@angular/core";

@Component({
    templateUrl: `./table-showcase.component.html`,
})
export class TableShowcaseComponent {
    public tabs = [
        { id: "default", label: "Default", routerLink: "default" },
        { id: "editable", label: "Editable", routerLink: "editable" },
        { id: "frozen", label: "Frozen", routerLink: "frozen" },
        { id: "nested", label: "Nested", routerLink: "nested" },
        { id: "no-wrap", label: "No Wrap", routerLink: "no-wrap" },
    ];
}
