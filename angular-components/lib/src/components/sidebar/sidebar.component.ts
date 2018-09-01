import { Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";

import { FooterComponent } from "../structure/footer.component";
import { HeaderComponent } from "../structure/header.component";

@Component({
    selector: "s-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
    public static nextId = 0;

    @Input()
    public id = `s-sidebar-${SidebarComponent.nextId++}`;

    @Input()
    public visible = false;

    @Input()
    public blockScroll = false;

    @Input()
    public header: string;

    @Output()
    public visibleChange = new EventEmitter<boolean>();

    @ContentChild(HeaderComponent)
    public headerSection: HeaderComponent;

    @ContentChild(FooterComponent)
    public footerSection: FooterComponent;

    public close(event: Event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
}
