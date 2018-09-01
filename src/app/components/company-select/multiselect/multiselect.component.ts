import {Component,ElementRef,OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,Input,Output,Renderer2,EventEmitter,
    forwardRef,ViewChild,ChangeDetectorRef,TemplateRef,ContentChildren,QueryList,SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {SelectItem} from 'primeng/components/common/selectitem';
import {DomHandler} from 'primeng/components/dom/domhandler';
import {ObjectUtils} from 'primeng/components/utils/objectutils';
import {PrimeTemplate} from 'primeng/components/common/shared';
import { MultiselectService } from '~src/app/components/company-select/multiselect/multiselect.service';

export const MULTISELECT_VALUE_ACCESSOR: any = {
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => MultiselectComponent),
multi: true
};

@Component({
selector: 'multiSelect',
templateUrl: './multiselect.component.html',
host: {
'[class.ui-inputwrapper-filled]': 'filled',
'[class.ui-inputwrapper-focus]': 'focus'
},
providers: [DomHandler,ObjectUtils,MULTISELECT_VALUE_ACCESSOR, MultiselectService]
})
export class MultiselectComponent implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

    @Input() defaultLabel: string = 'Choose';

    @Input() style: any;

    @Input() styleClass: string;

    @Input() panelStyle: any;

    @Input() panelStyleClass: string;

    @Input() inputId: string;

    @Input() disabled: boolean;

    @Input() filter: boolean = true;

    @Input() filterPlaceHolder: string;

    @Input() overlayVisible: boolean;

    @Input() tabindex: number;

    @Input() appendTo: any;

    @Input() dataKey: string;

    @Input() displaySelectedLabel: boolean = true;

    @Input() maxSelectedLabels: number = 3;

    @Input() selectedItemsLabel: string = '{0} items selected';

    @Input() showToggleAll: boolean = true;

    @Input() resetFilterOnHide: boolean = false;

    @Input() componentMode: string;

    @Input() dropdownIcon: string = 'fa fa-fw fa-caret-down';

    @Input() optionLabel: string;

    @Input() filterBackEnd: boolean = false;

    @Input() filterEndPoint: string;

    @Input() filterConditionalField: string;

    @Input() filterConditionalExcept: any[];

    @Input() filterConditionalOnly: any[];

    @Input() filterConditionalAll: boolean;

    @Input() filterResponseField: string;

    @Input() emptyOptionsLabel: string = 'Nenhuma opção carregada';

    @Input() group: boolean = false;

    @Input() getAllEndPoint: string;

    @Input() getAllRequestField: string;

    @Input() getAllResponseField: string;

    @Input() limit: number = 10;

    @Input() idVariableName: string = "id";

    @Input() idVariableGroupMasterName: string = "id";

    @Input() allSelectedInputLabel: string;

    @Input() selectAllWhenOpen: boolean = false;

    @Input() getOneEndPoint: string;

    @Input() filterOnInit: boolean = false;

    @Input() getOneResponseField: string;
    
    @Input() fieldsForLabel: string[];

    @Input() fieldsForList: string[];

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('panel') panelViewChild: ElementRef;

    @ViewChild('filterInput') filterInputChild: ElementRef;

    @ViewChild('cb') cb: ElementRef;

    @ViewChild('cbGroup') cbGroup: ElementRef;

    @ViewChild('infinite') infinite: ElementRef; 

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onPanelShow: EventEmitter<any> = new EventEmitter();

    @Output() onPanelHide: EventEmitter<any> = new EventEmitter();

    @Output() unselectedOptionsChange = new EventEmitter();

    @Output() onAllOptionsAreSelected = new EventEmitter();

    public groupsSelected: any[] = [];

    public allSelected: boolean = false;

    public unselectedOptionsValue: any[];

    public allOptionsAreSelectedValue: any[];

    public value: any[];

    public onModelChange: Function = () => { this.onChange.emit(this.value) };

    public onModelTouched: Function = () => {};

    public valuesAsString: string[] = [];

    public focus: boolean;

    filled: boolean;

    public documentClickListener: any;

    public container: HTMLDivElement;

    public panel: HTMLDivElement;

    public selfClick: boolean;

    public panelClick: boolean;

    public filterValue: string;

    public visibleOptions: SelectItem[] = [];

    public filtered: boolean;
        
    public itemTemplate: TemplateRef<any>;

    public focusedItemCheckbox: HTMLInputElement;

    public wasShown: boolean = false;

    public page: number = 0;

    public islastPage: boolean = false;

    public infiniteFiltered: boolean = false;

    public firstChange: boolean = true;

    public toggleAllClicked: boolean = false;

    public filterModel: string;

    _options: any[];

    constructor(
        public el: ElementRef, 
        public domHandler: DomHandler, 
        public renderer: Renderer2, 
        public objectUtils: ObjectUtils, 
        private cd: ChangeDetectorRef,
        private multiSelectService: MultiselectService
    ) {
    }

    @Input() 
    get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
        this.updateLabel();
    }

    @Input()
    get unselectedOptions(): any[] {
        return this.unselectedOptionsValue;
    }

    set unselectedOptions(val: any[]) {
        this.unselectedOptionsValue = val;
        this.unselectedOptionsChange.emit(this.unselectedOptionsValue);
    }

    label: string;

    ngOnInit() {
        this.updateLabel();
        setTimeout(() => { 
            if(this.filterBackEnd && (((this.value && this.value.length > 0) || (this.filterConditionalOnly && this.filterConditionalOnly.length > 0)) || this.filterOnInit)) {
                this.onFilterBackend();
            }
        }, 200);
        this.renderer.listen(this.infinite.nativeElement, 'scroll', (event) => {
            if (!this.islastPage && this.infinite.nativeElement.scrollTop + this.infinite.nativeElement.clientHeight >= this.infinite.nativeElement.scrollHeight) {
                this.page++;
                this.onFilterBackend(null, this.page, true);
            }
        })
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        this.panel = <HTMLDivElement> this.panelViewChild.nativeElement; 

        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }

        if(this.overlayVisible) {
            this.show();
        }
    }

    ngAfterViewChecked() {
        if(this.filtered) {
            if(this.appendTo)
                this.domHandler.absolutePosition(this.panel, this.container);
            else
                this.domHandler.relativePosition(this.panel, this.container);

            this.filtered = false;
        }
    }

    writeValue(value: any) : void {
        this.value = value;
        this.updateLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    }

    updateFilledState() {
        this.filled = (this.valuesAsString != null && this.valuesAsString.length > 0);
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    toggleAllByGroup(checkbox:any, id?:any) {
        if (id && typeof id == 'object') 
            this.filterConditionalOnly = id;
        this.allSelected = !this.allSelected;
        this.onAllOptionsAreSelected.emit(this.allSelected);
        this.unselectedOptions = [];
        if(checkbox.checked) {
            this.value = [];
            this.onModelChange(this.value);
            this.onChange.emit({value: this.value});
            this.updateLabel();
        } else {
            if(!checkbox.checked) {
                this.filterConditionalOnly && !this.filterConditionalOnly.length ? this.filterConditionalOnly = [this.filterConditionalOnly] : null; 
                this.multiSelectService.getAllItems(this.getAllEndPoint, this.filterConditionalOnly, this.getAllRequestField).subscribe(
                    items => {
                        this.value = items[this.getAllResponseField];
                        this.onModelChange(this.value);
                        this.onChange.emit({value: this.value});
                        this.updateLabel();
                    }
                );
            }
        }

        checkbox.checked = !checkbox.checked;
        if(this.isAllChecked()){
            this.allSelected = true;        
            this.onAllOptionsAreSelected.emit(this.allSelected);
        }
    }

    isAllByGroupChecked(value:any) {
        let allByGroupChecked: boolean = true;
        value.filiais.forEach((item:any) => {
            if(this.value && this.value.indexOf(item[this.idVariableName]) == -1) {
                allByGroupChecked = false;
            }
        });
        return allByGroupChecked;
    } 

    onItemClick(event:any, value:any) {
        if(this.allSelected) {
            if(this.unselectedOptions.indexOf(value) != -1) {
                this.unselectedOptions.splice(this.unselectedOptions.indexOf(value), 1)
            } else {
                this.unselectedOptions.push(value);
            }
        }
        let selectionIndex = this.findSelectionIndex(value);
        if(selectionIndex != -1)
            this.value = this.value.filter((val,i) => i!=selectionIndex);
        else       
            this.value = [...this.value||[],value];
        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event, value: this.value, itemValue: value});
        this.updateLabel();
        this.updateFilledState();
    }

    isSelected(value:any) {
        return this.findSelectionIndex(value) != -1;
    }

    findSelectionIndex(val: any): number {
        let index = -1;

        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }

    toggleAll(checkbox:any, id?:any) {
        if (id && typeof id !== 'object') 
            this.filterConditionalOnly = id;
        this.unselectedOptions = [];
        if(checkbox.checked) {
            this.value = [];
            this.onModelChange(this.value);
            this.onChange.emit({value: this.value});
            this.updateLabel();
        } else {
            this.multiSelectService.getAllItems(this.getAllEndPoint, [this.filterConditionalOnly], this.getAllRequestField).subscribe(
                items => {
                    this.value = items[this.getAllResponseField];
                    this.onModelChange(this.value);
                    this.onChange.emit({value: this.value});
                    this.updateLabel();
                }
            );
        }
        checkbox.checked = !checkbox.checked;
        this.allSelected = checkbox.checked;
        this.onAllOptionsAreSelected.emit(this.allSelected);
        if(this.isAllChecked()){
            this.allSelected = true;        
            this.onAllOptionsAreSelected.emit(this.allSelected);
        }
    } 

    isAllChecked() {
        let isAllChecked: boolean = true;
        if(this.group && this.options) {
            this.options.forEach(option => {
                if(!this.isAllByGroupChecked(option)) {
                    isAllChecked = false;
                }
            });
        } else {
            if(this.options && this.options.length > 0) {
                this.options.forEach(option => {
                    if(this.value && this.value.indexOf(option[this.idVariableName]) == -1) {
                        isAllChecked = false;
                    }
                });
            }
        }
        return isAllChecked;
    }

    show() {
        this.overlayVisible = true;
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.bindDocumentClickListener(); 
        if((this.value && this.value.length == 0) && this.group) {
            this.toggleAllByGroup(this.cbGroup); 
        } 

        if((this.value && this.value.length == 0) && !this.group && this.filterConditionalOnly) {
            this.toggleAll(this.cb); 
        } 

        if(this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);

        this.domHandler.fadeIn(this.panel, 250);
        this.onPanelShow.emit();
    }

    onfocus: boolean = true;

    hide() {
        this.filterModel = null;
        this.onFilterBackend();

        this.overlayVisible = false;
        this.unbindDocumentClickListener();
        if(this.resetFilterOnHide){
            this.filterValue = null;
            this.filterInputChild.nativeElement.value = null;
        }
        this.onPanelHide.emit();
    }

    close(event:any) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
    
    onMouseclick(event:any,input:any) {
        if(this.disabled) {
            return;
        }

        if(!this.panelClick) {
            if(this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }

        this.selfClick = true;
    }

    onInputFocus(event:any) {
        this.focus = true;
        this.onFocus.emit({originalEvent: event});
    }

    onInputBlur(event:any) {
        this.filterValue = null;
        this.focus = false;
        this.onBlur.emit({originalEvent: event});
        this.onModelTouched();
    }

    onInputKeydown(event:any) {
        switch(event.which) {
            //down
            case 40:
                if(!this.overlayVisible && event.altKey) {
                    this.show();
                }
                
                event.preventDefault();
            break;
            
            //escape and tab
            case 27:
            case 9:
                this.hide();
            break;
        }
    }

    updateLabel() {
        this.valuesAsString = [];
        if(this.value && this.value.length < 3 && this.value.length > 0) {
            this.value.forEach(it => {
                this.multiSelectService.get(it, this.getOneEndPoint).subscribe(
                    entity => {
                        let label = `${entity[this.fieldsForLabel[0]]} - ${entity[this.fieldsForLabel[1]]}`;
                        let index = this.valuesAsString.findIndex(index => label === index);
                        if(index === -1) this.valuesAsString.push(label);                    
                    }
                );
            });
        } else {
            if(this.value && this.options && this.value.length && this.displaySelectedLabel) {
                let label = '';
                for(let i = 0; i < this.value.length; i++) {
                    let itemLabel = this.findLabelByValue(this.value[i]);
                    if (itemLabel) {
                        if(label.length > 0) {
                            label = label + ', ';
                        }
                        label = label + itemLabel;
                    }
                }
                if(this.value.length <= this.maxSelectedLabels) {
                    this.valuesAsString.push(label);
                }
                else {
                    let pattern = /{(.*?)}/,
                    newSelectedItemsLabel = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                    this.valuesAsString.push(newSelectedItemsLabel);
                }
            }
            else {
                this.valuesAsString.push(this.defaultLabel);
            }
        }
    }

    findLabelByValue(val: any): string {
        let label = null;
        if(this.group) {
            this.options.forEach((option:any) => {
                option.filiais.forEach((item:any) => {
                    if(val == null && item[this.idVariableName] == null || this.objectUtils.equals(val, item[this.idVariableName], this.dataKey)) {
                        label = item.label;
                    }
                });
            });

            for(let i = 0; i < this.options.length; i++) {
                for(let j = 0; j < this.options[i].filiais; j++) {   
                    let option = this.options[i].filiais[j];
                    if(val == null && option[this.idVariableName] == null || this.objectUtils.equals(val, option[this.idVariableName], this.dataKey)) {
                        label = option.label;
                        break; 
                    }
                }
            }
        } else {
            for(let i = 0; i < this.options.length; i++) {
                let option = this.options[i];
                if(val == null && option[this.idVariableName] == null || this.objectUtils.equals(val, option[this.idVariableName], this.dataKey)) {
                    label = option.label;
                    break; 
                }
            }
        }
        return label;
    }


    onFilterFrontend(event:any) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for(let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if(option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    }

    onFilterBackend(event?:any, offset?:any, fromInfinite?:boolean) {
        let query = {};
        if(this.group) {
            let only;
            !this.filterConditionalAll ? only = this.filterConditionalOnly : only = [];
            query = {
                exceto: this.filterConditionalExcept,
                somente: only,
                todas: this.filterConditionalAll || false,
                texto: this.filterModel ? this.filterModel.trim().toLowerCase() : null,
                pagina: {
                    limit: this.limit,
                    offset: offset || 0
                }
            }
        } else {
            query = {
                texto: this.filterModel ? this.filterModel.trim().toLowerCase() : null,
                pagina: {
                    limit: this.limit,
                    offset: offset || 0
                }
            }
            query[this.filterConditionalField] = this.filterConditionalOnly;
        }
        this.multiSelectService.search(query, this.filterEndPoint)
        .subscribe((data: any) => {
            if(data[this.filterResponseField].length > 0){
                if(this.group) {
                    data[this.filterResponseField].forEach((option:any) => {
                        option.label = `${option[this.fieldsForList[0]]} - ${option[this.fieldsForList[1]]}`;
                        option.filiais.forEach((item:any) => {
                            item.label = `${item[this.fieldsForList[0]]} - ${item[this.fieldsForList[1]]}`;
                        });
                    });
                    if(fromInfinite) {
                        data[this.filterResponseField].forEach((it:any) => {
                            this.options.push(it);    
                        });
                        this.infiniteFiltered = true;
                    } else {
                        this.page = 0;
                        this.islastPage = false;
                        this.options = [];
                        this.options = data[this.filterResponseField];
                    }
                } else {
                    data[this.filterResponseField].forEach((item: any) => {
                        item.label = `${item[this.fieldsForList[0]]} - ${item[this.fieldsForList[1]]}`;
                    });
                    if(fromInfinite) {
                        data[this.filterResponseField].forEach((it:any) => {
                            this.options.push(it);    
                        });
                        this.infiniteFiltered = true;
                    } else {
                        this.page = 0;
                        this.islastPage = false;
                        this.options = [];
                        this.options = data[this.filterResponseField];
                    }
                }
            } else {
                if ( !data.totalRegistros ) {
                    this.page = 0;
                    this.islastPage = false;
                    this.options = [];
                } else {
                    this.islastPage = true;
                }
            }     
            this.onAllOptionsAreSelected.emit(this.isAllChecked());
        });
        this.filtered = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        // TODO - Remover
        if(
            (
                (this.group && (
                    (changes.filterConditionalOnly && changes.filterConditionalOnly.currentValue) || 
                    (changes.filterConditionalExcept && changes.filterConditionalExcept.currentValue) || 
                    changes.filterConditionalAll
                ) && (
                    (this.filterConditionalAll && (this.filterConditionalExcept && this.filterConditionalExcept.length > 0)) ||
                    (!this.filterConditionalAll && (this.filterConditionalOnly && this.filterConditionalOnly.length > 0)) ||
                    (this.filterConditionalAll && (this.filterConditionalExcept && this.filterConditionalExcept.length == 0) && 
                    (this.filterConditionalOnly && this.filterConditionalOnly.length == 0))
                ) || this.filterConditionalAll) || (
                    !this.group && (changes.filterConditionalOnly && changes.filterConditionalOnly.currentValue)
                )
            )
        ){
            this.wasShown = false;
            this.onFilterBackend();

        }
    }

    isItemVisible(option: SelectItem): boolean {
        if(this.filterValue && this.filterValue.trim().length) {
            for(let i = 0; i < this.visibleOptions.length; i++) {
                if(this.visibleOptions[i][this.idVariableName] == option[this.idVariableName]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }

    getVisibleOptions(): SelectItem[] {
        if(this.filterValue && this.filterValue.trim().length) {
            let items = [];
            for(let i = 0; i < this.options.length; i++) {
                let option = this.options[i];
                if(option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    }

    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.selfClick && !this.panelClick && this.overlayVisible) {
                    this.hide();
                }
                
                this.selfClick = false;
                this.panelClick = false;
                this.cd.markForCheck();
            });
        }        
    }

    unbindDocumentClickListener() {
        if(this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }        
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();

        if(this.appendTo) {
            this.container.appendChild(this.panel);
        }
    }

}