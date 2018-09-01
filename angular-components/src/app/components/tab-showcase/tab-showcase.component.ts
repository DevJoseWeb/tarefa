import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
    templateUrl: `./tab-showcase.component.html`,
})
export class TabShowcaseComponent {
    public orientationOptions = [
        { label: "Top", value: "top" },
        { label: "Right", value: "right" },
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
    ];
    public selectedOrientation = "top";

    public tabMenus: MenuItem[] = [
        { id: "1", label: "TabMenu 1" },
        { id: "2", label: "TabMenu 2" },
        { id: "3", label: "TabMenu 3" },
        { id: "4", label: "TabMenu 4", disabled: true },
        { id: "2", label: "TabMenu 2", disabled: true },
    ];
}
