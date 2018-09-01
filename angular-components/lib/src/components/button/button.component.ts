import { Component, HostBinding, Input, OnChanges, SimpleChanges, ViewChild, EventEmitter, Output, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { TieredMenu } from "primeng/tieredmenu";

import { ButtonPriority } from "./button-priority";
import { ButtonSize } from "./button-size";

@Component({
    selector: "s-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit, OnChanges {
    public static nextId = 0;

    @HostBinding("style.min-width") public minWidth = "40px";
    @Input() public id = `s-button-${ButtonComponent.nextId++}`;
    @Input() public label: string;
    @Input() public tooltip: string;
    @Input() public iconClass: string;
    @Input() public styleClass: string;
    @Input() public disabled = false;
    @Input() public auxiliary = false;
    @Input() public type = "button";
    @Input() public priority: ButtonPriority = ButtonPriority.Primary;
    @Input() public model: MenuItem[] = [];
    @Input() public size = ButtonSize.Default;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @ViewChild(TieredMenu) private menu: TieredMenu;

    public ngOnInit() {
        this.onClick.subscribe((event: any) => {
            if (!this.model || !this.model.length) return;

            this.menu.model = this.model.map(item => this.normalizeMenuItem(item));
            this.menu.toggle(event);
        });
    }

    public isOpen() {
        return this.model && this.model.length && this.menu.container && this.menu.container.style.display === "block" ? true : false;
    }

    public ngOnChanges(changes: SimpleChanges) {
        const hasIcon = this.iconClass;
        const hasText = this.label;
        const isMultiple = this.model && this.model.length;

        if (hasText || (hasIcon && isMultiple)) this.minWidth = "80px";
        if (hasText && hasIcon && isMultiple) this.minWidth = "100px";
    }

    private normalizeMenuItem(menuItem: MenuItem): MenuItem {
        const items = menuItem.items && (<MenuItem[]>menuItem.items).map(item => this.normalizeMenuItem(item));
        return { ...menuItem, title: menuItem.title || menuItem.label, items };
    }
}
