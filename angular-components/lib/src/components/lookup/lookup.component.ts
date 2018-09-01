import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Table } from "primeng/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { FormField } from "../dynamic-form/form-field";

@Component({
    selector: "s-lookup",
    templateUrl: "./lookup.component.html",
    styleUrls: ["./lookup.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LookupComponent),
            multi: true,
        },
    ],
    encapsulation: ViewEncapsulation.None,
})
export class LookupComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
    public static nextId = 0;

    @Input() public formControlName: string;
    @Input() public id = `s-lookup-${LookupComponent.nextId++}`;
    @Input() public multiple: boolean;
    @Input() public dataKey: string;
    @Input() public required: boolean;
    @Input() public disabled = false;
    @Input() public showSearch = true;

    @Input() public lookupSuggestions: any[];
    @Input() public lookupDisplayField: string;
    @Input() public lookupEmptyMessage: string;

    @Input() public searchTitle = "Pesquisa avançada";
    @Input() public searchEmptyTitle = "Nenhum registro encontrado";
    @Input() public searchEmptyDescription: string;
    @Input() public searchGridData: any[];
    @Input() public searchTotalRecords: number;
    @Input() public searchFields: FormField[] = [];
    @Input() public searchGridFields: FormField[];

    @Input() public filterLabel = "Filtrar";
    @Input() public clearLabel = "Limpar";
    @Input() public cancelLabel = "Cancelar";
    @Input() public selectLabel = "Selecionar";
    @Input() public searchTotalRecordsLabel: string;

    @Output() public onLookupRequest: EventEmitter<any> = new EventEmitter();
    @Output() public onSearchRequest: EventEmitter<any> = new EventEmitter();
    @Output() public onFocus: EventEmitter<any> = new EventEmitter();
    @Output() public onBlur: EventEmitter<any> = new EventEmitter();
    @Output() public onKeyUp: EventEmitter<any> = new EventEmitter();
    @Output() public onSelect: EventEmitter<any> = new EventEmitter();
    @Output() public onUnselect: EventEmitter<any> = new EventEmitter();
    @Output() public onClear: EventEmitter<any> = new EventEmitter();

    @ViewChild(Table) public table: Table;

    public value: any;

    public loading: boolean;

    public dialogVisible = false;
    public selected: any[] = [];
    public formGroupDialog: FormGroup;

    private onChange: any;
    private onTouched: any;
    private ngUnsubscribe = new Subject();

    public ngOnInit() {
        this.searchGridFields = this.searchGridFields || this.searchFields;

        const group = this.searchFields.reduce((result: any, field) => {
            result[field.name] = new FormControl();
            return result;
        }, {});

        this.formGroupDialog = new FormGroup(group);

        this.onSearchRequest.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => (this.loading = true));
        this.onSelect.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.onChange(this.value));
        this.onUnselect.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.onChange(this.value));
        this.onClear.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => !this.multiple && this.onChange());
        this.onBlur.pipe(takeUntil(this.ngUnsubscribe)).subscribe(event => {
            const currentValue = this.value && this.value[this.lookupDisplayField];
            const { value } = event.target;

            if (this.multiple || !currentValue || currentValue == value) return;

            const newValue = "";
            event.target.value = newValue;
            this.onChange(newValue);
        });
    }

    public ngOnChanges(oldValue: any) {
        if (this.dialogVisible && this.searchGridData !== oldValue.dataGrid) this.loading = false;
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public getGridData() {
        return this.searchGridData;
    }

    public getLookupSuggestions() {
        return this.lookupSuggestions;
    }

    public lazyLoadGrid(event: any) {
        const filters = this.formGroupDialog.getRawValue();
        const params = { ...event, filterData: filters };
        this.onSearchRequest.next(params);
    }

    public lazyLoadLookup(event: any) {
        this.onLookupRequest.next(event.query);
    }

    public showDialog() {
        this.searchGridData = undefined;

        let selected: any = [];
        if (this.multiple && this.value) selected = selected.concat(this.value);
        else if (this.value) selected = [this.value];
        this.selected = selected;

        this.loading = true;
        this.dialogVisible = true;
    }

    public hideDialog() {
        this.dialogVisible = false;
    }

    public search() {
        this.table.reset();
    }

    public clear() {
        this.formGroupDialog.reset();
        this.table.reset();
    }

    public select() {
        const selected = this.selected && (this.multiple ? this.selected : this.selected[0]);
        this.value = selected;
        this.onSelect.next(selected);
        this.hideDialog();
    }

    public registerOnChange(fn: Function) {
        this.onChange = (val: any) => {
            this.writeValue(val);
            fn(val);
        };
    }

    public registerOnTouched(fn: Function) {
        this.onTouched = fn;
    }

    public writeValue(value: any) {
        this.value = value;
    }

    public setDisabledState(state: boolean) {
        this.disabled = state;
    }
}
