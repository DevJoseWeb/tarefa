import { Component } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { Subject } from "rxjs";
import { finalize, takeUntil } from "rxjs/operators";

import { LoadingStateShowcaseService } from "./loading-state-showcase.service";

@Component({
    templateUrl: "./loading-state-showcase.component.html",
})
export class LoadingStateShowcaseComponent {
    public containerLoading = false;

    public set pageLoading(loading: boolean) {
        this._pageLoading = loading;
        if (loading) setTimeout(() => (this._pageLoading = false), 2000);
    }

    public get pageLoading() {
        return this._pageLoading;
    }

    public gridData: any[];
    public gridColumns = this.tableShowcaseService.getTableColumns();
    public gridLoading = true;
    public gridTotalRecords: number;

    private _pageLoading: boolean;
    private ngUnsubscribe = new Subject();

    constructor(private tableShowcaseService: LoadingStateShowcaseService) {}

    public updateGridData(event: LazyLoadEvent) {
        const size = event.rows;
        const page = event.first / size;
        this.gridLoading = true;

        this.tableShowcaseService
            .getTableData(page, size)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                finalize(() => {
                    this.gridLoading = false;
                })
            )
            .subscribe((result: any) => {
                this.gridData = result.contents;
                this.gridTotalRecords = result.totalSize;
            });
    }

    public activate() {
        this.gridLoading = true;
    }

    public deactivate() {
        this.gridLoading = false;
    }

    public activateContainer() {
        this.containerLoading = !this.containerLoading;
    }
}
