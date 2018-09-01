import { Component, Input, TemplateRef, ViewEncapsulation, OnDestroy } from "@angular/core";

@Component({
    selector: "s-loading-state",
    templateUrl: "./loading-state.component.html",
    styleUrls: ["./loading-state.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class LoadingStateComponent implements OnDestroy {
    public static nextId = 0;

    @Input() public id = `s-loading-state-${LoadingStateComponent.nextId++}`;
    @Input() public blockWindow: boolean;

    @Input()
    public set loading(loading: boolean) {
        this._loading = loading;

        if (loading) this.block();
        else this.unblock();
    }

    public get loading() {
        return this._loading;
    }

    public contents: TemplateRef<any>;
    public blocking: boolean;

    private _loading: boolean;
    private BLOCK_TIMEOUT_VALUE = 300;
    private UNBLOCK_TIMEOUT_VALUE = 200;
    private blockTimeoutId: any;
    private unblockTimeoutId: any;

    public block() {
        if (this.unblockTimeoutId) {
            clearTimeout(this.unblockTimeoutId);
            this.unblockTimeoutId = undefined;
        }

        if (!this.blockTimeoutId) {
            this.blockTimeoutId = setTimeout(() => {
                this.blocking = true;
                this.blockTimeoutId = undefined;
            }, this.BLOCK_TIMEOUT_VALUE);
        }
    }

    public unblock() {
        if (this.blockTimeoutId) {
            clearTimeout(this.blockTimeoutId);
            this.blockTimeoutId = undefined;
        }

        if (!this.unblockTimeoutId) {
            this.unblockTimeoutId = setTimeout(() => {
                this.blocking = false;
                this.unblockTimeoutId = undefined;
            }, this.UNBLOCK_TIMEOUT_VALUE);
        }
    }

    public ngOnDestroy() {
        if (this.blockTimeoutId) clearTimeout(this.blockTimeoutId);
        if (this.unblockTimeoutId) clearTimeout(this.unblockTimeoutId);
    }
}
