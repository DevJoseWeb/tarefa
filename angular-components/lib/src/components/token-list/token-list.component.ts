import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: `s-token-list`,
    templateUrl: `./token-list.component.html`,
    styleUrls: ["./token-list.component.css"],
})
export class TokenListComponent {
    public static nextId = 0;

    @Input() id = `s-token-list-${TokenListComponent.nextId++}`;
    @Input() tokens: IToken[];
    @Input() removableTokens = false;

    @Output() public tokenSelected: EventEmitter<IToken> = new EventEmitter();
    @Output() public tokenRemoved: EventEmitter<IToken> = new EventEmitter();
}

export interface IToken {
    id: string;
    label: string;
}
