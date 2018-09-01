import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Router } from '@angular/router';
import { PageSuggestion } from '~src/app/components/company-select/page-suggestion';
import { MultiselectComponent } from "~src/app/components/company-select/multiselect/multiselect.component"
import { environment } from "~src/environments/environment";

@Component({
    selector: 'company-select',
    templateUrl: './company-select.component.html',
    providers: []
})
export class CompanySelectComponent implements OnInit {

    @Input() companies: any;
    @Input() subCompanies: any;
    @Input() companyIdString: string;
    @Input() subCompanyIdString: string;
    @Input() companyFilterEndPoint: string;
    @Input() subCompanyFilterEndPoint: string;
    @Input() companyFilterResponseField: string;
    @Input() subCompanyFilterResponseField: string;
    @Input() companyfilterConditionalField: string;
    @Input() subCompanyFilterConditionalField: string;
    @Input() companySelectionMode: string = "single";
    @Input() subCompanySelectionMode: string = "single";
    @Input() subCompanyByGroup: boolean = false;
    @Input() getAllCompaniesEndPoint: string;
    @Input() getAllCompaniesResponseField: string = "empresaIds";
    @Input() getAllSubCompaniesEndPoint: any;
    @Input() getAllSubCompaniesResponseField: string = "filialIds";
    @Input() getAllSubCompaniesRequestField: string = "empresaIds";
    @Input() companyIdVariableName: string;
    @Input() subCompanyIdVariableName: string;
    @Input() idVariableGroupMasterName: string;
    @Input() allSelectedInputLabel: string = "Todos selecionados"
    @Input() companyRequired: boolean = false;
    @Input() subCompanyRequired: boolean = false;
    @Input() hasSubCompany: boolean = true;
    @Input() selectAllSubCompaniesWhenOpen: boolean;
    @Input() getOneCompanyEndPoint: string = "com_comum/entities/empresa";
    @Input() getOneSubCompanyEndPoint: string = "com_comum/entities/filial";
    @Input() getOneCompanyResponseField: string = "empresas";
    @Input() getOneSubCompanyResponseField: string = "filiais";
    @Input() companyColStyleClass: string = "ui-g-12 ui-md-6";
    @Input() subCompanyColStyleClass: string = "ui-g-12 ui-md-6";
    @Input() processName: string = `${environment.project.domain}/${environment.project.service}${this.router.url}`;
    @Input() componentMode: string;
    @Input() companyDisabled: boolean = false;
    @Input() subCompanyDisabled: boolean = false;
    @Input() fieldsForCompanyLabel: string[] = ['codigo', 'nome'];
    @Input() fieldsForSubCompanyLabel: string[] = ['codigo', 'nome'];
    @Input() fieldsForCompanyList: string[] = ['codigo', 'nome'];
    @Input() fieldsForSubCompanyList: string[] = ['codigo', 'nome'];
    @Input() companyLabel: string;
    @Input() subCompanyLabel: string;
    @Input() selectCompanyLabel: string;
    @Input() selectSubCompanyLabel: string;
    @Input() companyErrorMsg: string;
    @Input() subCompanyErrorMsg: string;
    @Output() companyModelChange = new EventEmitter();
    @Output() subCompanyModelChange = new EventEmitter();
    @Output() unselectedCompaniesChange = new EventEmitter();
    @Output() unselectedSubCompaniesChange = new EventEmitter();
    @Output() onCompanyModelChange = new EventEmitter();
    @Output() onSubCompanyModelChange = new EventEmitter();
    @ViewChild('multiSelectCompanies') public multiSelectCompanies: any;
    @ViewChild('multiSelectCompany') public multiSelectCompany: any;
    @ViewChild('singleSelectCompany') public singleSelectCompany: any;
    @ViewChild('multiSelectSubCompanies') public multiSelectSubCompanies: any;
    @ViewChild('singleSelectSubCompany') public singleSelectSubCompany: any;
    @ViewChild('SingleSelectCompanyComponent') public singleSelectCompanyComponent: MultiselectComponent;
    public companyModelValue: any;
    public subCompanyModelValue: any; 
    public unselectedCompaniesValue: any[] = [];
    public unselectedSubCompaniesValue: any[] = [];
    public allCompaniesSelected: boolean;
    public allSubCompaniesSelected: boolean;
    public pageSuggestions: PageSuggestion = new PageSuggestion();

    constructor(private router: Router, private cd: ChangeDetectorRef ) {
        let pageSggestionsFromLocalStorage = JSON.parse(localStorage.getItem(this.processName));
        pageSggestionsFromLocalStorage ? this.pageSuggestions = pageSggestionsFromLocalStorage : null;
    }
    
    ngOnInit() {
        setTimeout(() => {
            if(!this.companyModel || this.companyModel.length == 0){
                this.pageSuggestions && this.pageSuggestions.company ? this.companyModel = this.pageSuggestions.company: null;
                this.pageSuggestions && this.pageSuggestions.subCompany && this.hasSubCompany ? this.subCompanyModel = this.pageSuggestions.subCompany: null;
                if(!this.subCompanyModel || this.subCompanyModel.length == 0) {
                    this.pageSuggestions && this.pageSuggestions.subCompany ? this.subCompanyModel = this.pageSuggestions.subCompany: null;
                }
            }
            this.companyModel ? this.onCompanyModelChange.emit(this.companyModel) : null;
            this.subCompanyModel ? this.onSubCompanyModelChange.emit(this.subCompanyModel) : null;
        }, 100);
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    onCompanyChange(event: any) {
        if(this.hasSubCompany) {
            if(this.subCompanySelectionMode == 'single') {
                this.subCompanyModel = null;
            } else {
                this.subCompanyModel = [];
            }
        }
        this.pageSuggestions.company = this.companyModel;
        this.hasSubCompany ? this.pageSuggestions.subCompany = this.subCompanyModel : null;
        localStorage.setItem(this.processName, JSON.stringify(this.pageSuggestions));
        this.onCompanyModelChange.emit(this.companyModel)

        if(this.hasSubCompany) {
            if(this.companySelectionMode == 'multiple') {
                if (this.companyModel.length) {
                    this.singleSelectCompanyComponent.toggleAllByGroup(event, this.companyModel);
                }
            } else if (this.singleSelectCompanyComponent) {
                if (this.companyModel) {
                    this.singleSelectCompanyComponent.toggleAll(event, this.companyModel);
                }
            }
        }
        
    }

    onSubCompanyChange(event: any) {
        this.pageSuggestions.company = this.companyModel;
        this.pageSuggestions.subCompany = this.subCompanyModel;
        localStorage.setItem(this.processName, JSON.stringify(this.pageSuggestions));
        this.onSubCompanyModelChange.emit(this.subCompanyModel)
    }

    @Input()
    get unselectedCompanies() {
        return this.unselectedCompaniesValue;
    }
    
    set unselectedCompanies(val) {
        this.unselectedCompaniesValue = val;
        this.unselectedCompaniesChange.emit(this.unselectedCompaniesValue);
    }

    @Input()
    get unselectedSubCompanies() {
        return this.unselectedSubCompaniesValue;
    }
    
    set unselectedSubCompanies(val) {
        this.unselectedSubCompaniesValue = val;
        this.unselectedSubCompaniesChange.emit(this.unselectedSubCompaniesValue);
    }

    @Input()
    get companyModel() {
        return this.companyModelValue;
    }
    
    set companyModel(val) {
        this.companyModelValue = val;
        this.companyModelChange.emit(this.companyModelValue);
    }

    @Input()
    get subCompanyModel() {
        return this.subCompanyModelValue;
    }
    
    set subCompanyModel(val) {
        this.subCompanyModelValue = val;
        this.subCompanyModelChange.emit(this.subCompanyModelValue);
    }

    public setAllCompaniesSelected(event: any) {
        this.allCompaniesSelected = event;
    }

    public setAllSubCompaniesSelected(event: any) {
        this.allSubCompaniesSelected = event;
    }

}