import { Component, OnDestroy } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { Subject } from "rxjs";
import { finalize, takeUntil } from "rxjs/operators";

import { TableShowcaseService } from "../../table-showcase.service";

@Component({
    templateUrl: "./editable-tab.component.html",
})
export class EditableTabComponent implements OnDestroy {
    public gridData: any[];
    public gridColumns = this.tableShowcaseService.getPeopleTableColumns();
    public gridLoading = true;
    public gridTotalRecords: number;
    public options = [{ label: "Grid", value: false }, { label: "List", value: true }];
    public list = false;

    public genderOptions: string[] = [];

    private ngUnsubscribe = new Subject();

    constructor(private tableShowcaseService: TableShowcaseService) {}

    public updateGridData(event: LazyLoadEvent) {
        const size = event.rows;
        const page = event.first / size;
        this.gridLoading = true;

        this.tableShowcaseService
            .getPeopleTableData(page, size)
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

    public filterGenders() {
        this.genderOptions = ["male", "female"];
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
