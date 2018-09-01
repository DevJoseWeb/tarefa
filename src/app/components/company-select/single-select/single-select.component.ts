import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,Input,Output,Renderer2,EventEmitter,ContentChildren,
    QueryList,ViewChild,TemplateRef,forwardRef,ChangeDetectorRef,NgZone} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SelectItem} from 'primeng/components/common/selectitem';
import {SharedModule,PrimeTemplate} from 'primeng/components/common/shared';
import {DomHandler} from 'primeng/components/dom/domhandler';
import {ObjectUtils} from 'primeng/components/utils/objectutils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { SingleSelectService } from '~src/app/components/company-select/single-select/single-select.service';

export const DROPDOWN_VALUE_ACCESSOR: any = {
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SingleSelectComponent),
multi: true
};

@Component({
    selector: 'single-select',
    templateUrl: './single-select.component.html',
    animations: [
        trigger('panelState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler,ObjectUtils,DROPDOWN_VALUE_ACCESSOR, SingleSelectService]
})

export class SingleSelectComponent implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;
    
    @Input() name: string;

    @Input() style: any;
    
    @Input() panelStyle: any;

    @Input() styleClass: string;
    
    @Input() panelStyleClass: string;
    
    @Input() disabled: boolean;
    
    @Input() readonly: boolean;
    
    @Input() autoWidth: boolean = true;
    
    @Input() required: boolean;
    
    @Input() editable: boolean;
    
    @Input() appendTo: any;

    @Input() tabindex: number;
    
    @Input() placeholder: string;
    
    @Input() filterPlaceholder: string;

    @Input() inputId: string;
    
    @Input() dataKey: string;
    
    @Input() filterBy: string = 'label';
    
    @Input() lazy: boolean = true;
    
    @Input() autofocus: boolean;
    
    @Input() resetFilterOnHide: boolean = false;
    
    @Input() dropdownIcon: string = 'fa fa-fw fa-caret-down';
    
    @Input() optionLabel: string;

    @Input() autoDisplayFirst: boolean = true;

    @Input() group: boolean;

    @Input() showClear: boolean;

    @Input() emptyFilterMessage: string = 'No results found';
    
    @Input() filterBackEnd: boolean = false;

    @Input() filterEndPoint: string;

    @Input() filterConditionalExcept: any[];

    @Input() filterConditionalOnly: any[];

    @Input() filterConditionalAll: boolean;

    @Input() filterConditionalField: string;

    @Input() filterResponseField: string;

    @Input() limit: number = 10;

    @Input() idVariableName: string;

    @Input() getOneEndPoint: string;

    @Input() getOneResponseField: string;

    @Input() componentMode: string;

    @Input() fieldsForLabel: string[];

    @Input() fieldsForList: string[];

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('panel') panelViewChild: ElementRef;
    
    @ViewChild('itemswrapper') itemsWrapperViewChild: ElementRef;

    @ViewChild('filter') filterViewChild: ElementRef;
    
    @ViewChild('in') focusViewChild: ElementRef;
    
    @ViewChild('editableInput') editableInputViewChild: ElementRef;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;

    public groupTemplate: TemplateRef<any>;

    public selectedItemTemplate: TemplateRef<any>;
    
    selectedOption: any;
    
    _options: any[];
    
    value: any;
    
    onModelChange: Function = () => { this.onChange.emit(this.value) };
    
    onModelTouched: Function = () => {};

    optionsToDisplay: any[];
    
    hover: boolean;
    
    focus: boolean;

    filled: boolean;
    
    public panelVisible: boolean = false;
    
    public shown: boolean;
    
    public documentClickListener: any;
    
    public optionsChanged: boolean;
    
    public panel: HTMLDivElement;
    
    public container: HTMLDivElement;
    
    public itemsWrapper: HTMLDivElement;
    
    public initialized: boolean;
    
    public selfClick: boolean;
    
    public itemClick: boolean;

    public clearClick: boolean;
    
    public hoveredItem: any;
    
    public selectedOptionUpdated: boolean;
    
    public filterValue: string;

    public page: number = 0;

    public islastPage: boolean = false;

    public infiniteFiltered: boolean = false;
    
    public filterModel: string;

    constructor(
        public el: ElementRef, 
        public domHandler: DomHandler, 
        public renderer: Renderer2, 
        private cd: ChangeDetectorRef,
        public objectUtils: ObjectUtils, 
        public zone: NgZone,
        private singleSelectService: SingleSelectService) {}
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                break;

                case 'group':
                    this.groupTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }
    
    ngOnInit() {
        this.optionsToDisplay = this.options;
        setTimeout(() => {
            if(this.filterBackEnd && this.value) {
                this.onFilterBackEnd();
            }
        }, 150);
        this.updateSelectedOption(null);
        this.renderer.listen(this.itemsWrapperViewChild.nativeElement, 'scroll', (event) => {
            if (!this.islastPage && this.itemsWrapperViewChild.nativeElement.scrollTop + this.itemsWrapperViewChild.nativeElement.clientHeight >= this.itemsWrapperViewChild.nativeElement.scrollHeight) {
                this.page++;
                this.onFilterBackEnd(null, this.page, true);
            }
        })
    }
    
    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
        this.optionsToDisplay = this._options;
        this.updateSelectedOption(this.value);
        this.optionsChanged = true;
        
        if(this.filterValue && this.filterValue.length) {
            this.activateFilter();
        }
    }
    
    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        this.panel = <HTMLDivElement> this.panelViewChild.nativeElement;
        this.itemsWrapper = <HTMLDivElement> this.itemsWrapperViewChild.nativeElement;
        
        if(this.editable) {
            this.updateEditableLabel();
        }
        
        this.updateDimensions();
        this.initialized = true;
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
    }
    
    get label(): string {
        return (this.selectedOption ? this.selectedOption.label : null);
    }
    
    updateEditableLabel(): void {
        if(this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value||'');
        }
    }
    
    onItemClick(event:any, option:any) {
        this.itemClick = true;
        this.selectItem(event, option);
        this.focusViewChild.nativeElement.focus();
        this.filled = true;
        this.hide();
    }
    
    selectItem(event:any, option:any) {
        if(this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option[this.idVariableName];
            
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    
    ngAfterViewChecked() {
        if(this.shown) {
            this.onShow();
            this.shown = false;
        }
        
        if(this.optionsChanged && this.panelVisible) {
            this.optionsChanged = false;
            
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.updateDimensions();
                    this.alignPanel();
                }, 1);
            });
        }
        
        if(this.selectedOptionUpdated && this.itemsWrapper) {
            let selectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            if(selectedItem) {
                this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.panel, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    }
    
    writeValue(value: any): void {
        if(this.filter) {
            this.resetFilter();
        }
        
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    }
    
    resetFilter(): void {
        if(this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
        
        this.optionsToDisplay = this.options;
    }
    
    updateSelectedOption(val: any): void {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if(this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        if(!this.selectedOption && val) {
            this.singleSelectService.get(val, this.getOneEndPoint).subscribe(
                response => {
                    response.label = `${response[this.fieldsForLabel[0]]} - ${response[this.fieldsForLabel[1]]}`;
                    let entity = response;

                    this.selectedOption = entity;
                }
            );
        }
        this.selectedOptionUpdated = true;
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
    
    updateDimensions() {
        if(this.autoWidth) {
            let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if(!this.style||(!this.style['width']&&!this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    }
    
    onMouseclick(event:any) {
        if(this.disabled||this.readonly) {
            return;
        }
        this.selfClick = true;
        this.clearClick = this.domHandler.hasClass(event.target, 'ui-dropdown-clear-icon');
        
        if(!this.itemClick && !this.clearClick) {
            this.focusViewChild.nativeElement.focus();
            
            if(this.panelVisible)
                this.hide();
            else {
                this.show();

                if (this.filterViewChild != undefined) {
                    setTimeout(() => {
                        this.filterViewChild.nativeElement.focus();
                    }, 200);
                }
            }
        }
    }
    
    onEditableInputClick(event:any) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    }
    
    onEditableInputFocus(event:any) {
        this.focus = true;
        this.hide();
    }
    
    onEditableInputChange(event:any) {
        this.value = event.target[this.idVariableName];
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    
    onShow() {
        this.bindDocumentClickListener();

        if(this.options && this.options.length) {
            this.alignPanel();
            
            let selectedListItem = this.domHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
            if(selectedListItem) {
                this.domHandler.scrollInView(this.itemsWrapper, selectedListItem);
            }
        }
    }
    
    show() {
        this.filterBackEnd ? this.onFilterBackEnd() : null;
        if(this.appendTo) {
            this.panel.style.minWidth = this.domHandler.getWidth(this.container) + 'px';
        }
        
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.panelVisible = true;
        this.shown = true;
    }
    
    hide() {
        this.panelVisible = false;
        
        if(this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
    }
    
    alignPanel() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
    }
    
    onInputFocus(event:any) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    
    onInputBlur(event:any) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onKeydown(event:any) {
        if(this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }

        switch(event.which) {
            //down
            case 40:
                if(!this.panelVisible && event.altKey) {
                    this.show();
                }
                else {
                    if(this.group) {
                        let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption[this.idVariableName], this.optionsToDisplay) : -1;
                        
                        if(selectedItemIndex !== -1) {
                            let nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if(nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if(this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0].items[0]);
                        }
                    }
                    else {
                        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption[this.idVariableName], this.optionsToDisplay) : -1;
                        let nextItemIndex = selectedItemIndex + 1;
                        if(nextItemIndex != (this.optionsToDisplay.length)) {
                            this.selectItem(event, this.optionsToDisplay[nextItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0]);
                        }
                    }
                }
                
                event.preventDefault();
                
            break;
            
            //up
            case 38:
                if(this.group) {
                    let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption[this.idVariableName], this.optionsToDisplay) : -1;
                    if(selectedItemIndex !== -1) {
                        let prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if(prevItemIndex >= 0) {
                            this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if(prevItemIndex < 0) {
                            let prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if(prevGroup) {
                                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption[this.idVariableName], this.optionsToDisplay) : -1;
                    if(selectedItemIndex > 0) {
                        let prevItemIndex = selectedItemIndex - 1;
                        this.selectItem(event, this.optionsToDisplay[prevItemIndex]);
                        this.selectedOptionUpdated = true;
                    }
                }

                event.preventDefault();
            break;

            //space
            case 32:
            case 32:
                if(!this.panelVisible){
                    this.show();
                    event.preventDefault();
                }
            break;
            
            //enter
            case 13:
                if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                    this.hide();
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
    
    findOptionIndex(val: any, opts: any[]): number {
        let index: number = -1;
        if(opts) {
            for(let i = 0; i < opts.length; i++) {
                if((val == null && opts[i][this.idVariableName] == null) || this.objectUtils.equals(val, opts[i][this.idVariableName], this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }

    findOptionGroupIndex(val: any, opts: any[]): any {
        let groupIndex, itemIndex;

        if(opts) {
            for(let i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, opts[i].items);

                if(itemIndex !== -1) {
                    break;
                }
            }
        }

        if(itemIndex !== -1) {
            return {groupIndex: groupIndex, itemIndex: itemIndex};
        }
        else {
            return -1;
        }
    }
    
    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem {
        if(this.group && !inGroup) {
            let opt: SelectItem;
            if(opts && opts.length) {
                for(let optgroup of opts) {
                    opt = this.findOption(val, optgroup.items, true);
                    if(opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            let index: number = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    }

    onFilterBackEnd(event?:any, offset?:any, fromInfinite?:boolean) {
        let query = {
            texto: this.filterModel ? this.filterModel.trim().toLowerCase() : null,
            pagina: {
                limit: this.limit,
                offset: offset || 0
            }
        }

        this.filterConditionalOnly && this.filterConditionalOnly.length ? query[this.filterConditionalField] = this.filterConditionalOnly[0] : query[this.filterConditionalField] = this.filterConditionalOnly;
        this.singleSelectService.search(query, this.filterEndPoint)
        .subscribe((data: any) => {
            if(data[this.filterResponseField].length > 0){
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
                    this.options = data[this.filterResponseField];
                }  
            } else {
                this.islastPage = true;
            } 
        });
        this.optionsChanged = true;
    }
    
    onFilterFrontEnd(event:any): void {
        let inputValue = event.target[this.idVariableName].toLowerCase();
        if(inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
        }
        
        this.optionsChanged = true;
    }
    
    activateFilter() {
        let searchFields: string[] = this.filterBy.split(',');
        if(this.options && this.options.length) {
            if(this.group) {
                let filteredGroups = [];
                for(let optgroup of this.options) {
                    let filteredSubOptions = this.objectUtils.filter(optgroup.items, searchFields, this.filterValue);
                    if(filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({
                            label: optgroup.label,
                            value: optgroup[this.idVariableName],
                            items: filteredSubOptions
                        });
                    }
                }

                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = this.objectUtils.filter(this.options, searchFields, this.filterValue);
            }

            this.optionsChanged = true;
        }
    }
    
    applyFocus(): void {
        if(this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.selfClick&&!this.itemClick) {
                    this.panelVisible = false;
                    this.unbindDocumentClickListener();
                }
                
                this.selfClick = false;
                this.itemClick = false;
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

    updateFilledState() {
        this.filled = (this.value != null);
    }

    clear(event: Event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    }
    
    ngOnDestroy() {
        this.initialized = false;
        
        this.unbindDocumentClickListener();
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    }
}

/* @NgModule({
    imports: [CommonModule,SharedModule],
    exports: [SingleSelectComponent,SharedModule],
    declarations: [SingleSelectComponent]
})
export class DropdownModule { } */
