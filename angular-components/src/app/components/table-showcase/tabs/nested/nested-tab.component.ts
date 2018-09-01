import { Component, OnDestroy } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { Subject } from "rxjs";
import { finalize, takeUntil } from "rxjs/operators";

import { TableShowcaseService } from "../../table-showcase.service";

@Component({
    templateUrl: "./nested-tab.component.html",
})
export class NestedTabComponent implements OnDestroy {
    public gridData: any[];
    public gridColumns = this.tableShowcaseService.getCountryTableColumns();
    public gridTotalRecords: number;
    public selected: any[] = [];
    public gridLoading = true;

    public nestedGridData: any[];
    public nestedGridColumns = this.tableShowcaseService.getPeopleTableColumns().splice(0, 4);
    public nestedGridTotalRecords: number;
    public nestedGridLoading: any[] = [];

    public options = [{ label: "Grid", value: false }, { label: "List", value: true }];
    public list = false;

    private ngUnsubscribe = new Subject();

    constructor(private tableShowcaseService: TableShowcaseService) {}

    public updateGridData(event: LazyLoadEvent) {
        const size = event.rows;
        const page = event.first / size;
        this.gridLoading = true;

        this.tableShowcaseService
            .getCountryTableData(page, size)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                finalize(() => {
                    this.gridLoading = false;
                })
            )
            .subscribe((result: any) => {
                this.gridData = result.contents.map((country: any) => ({
                    ...country,
                    nestedGridData: [],
                    nestedGridColumns: this.tableShowcaseService.getPeopleTableColumns().splice(0, 4),
                    nestedGridTotalRecords: 0,
                    nestedGridLoading: true,
                }));
                this.gridTotalRecords = result.totalSize;
            });
    }

    public updateNestedGridData(event: LazyLoadEvent, country: any) {
        const size = event.rows;
        const page = event.first / size;
        country.nestedGridLoading = true;

        this.tableShowcaseService
            .getPeopleTableData(page, size)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                finalize(() => {
                    country.nestedGridLoading = false;
                })
            )
            .subscribe((result: any) => {
                country.nestedGridData = result.contents;
                country.nestedGridTotalRecords = result.totalSize;
            });
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
