import {
    AfterViewInit,
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from "@angular/core";
import { LoadingStateComponent } from "./loading-state.component";

@Directive({
    selector: "[sLoadingState]",
})
export class LoadingStateDirective implements AfterViewInit, OnDestroy {
    @Input()
    public set sLoadingState(active: boolean) {
        this._loading = active;
        if (this.loaderComponent) this.loaderComponent.instance.loading = active;
    }

    public get sLoadingState() {
        return this._loading;
    }

    private _loading = false;
    private loaderComponent: ComponentRef<LoadingStateComponent>;

    constructor(
        private target: ViewContainerRef,
        private template: TemplateRef<any>,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdr: ChangeDetectorRef
    ) {}

    public ngAfterViewInit() {
        this.createComponent();
    }

    private createComponent() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(LoadingStateComponent);
        this.loaderComponent = this.target.createComponent(factory);
        this.loaderComponent.instance.contents = this.template;
        this.loaderComponent.instance.loading = this.sLoadingState;
        this.cdr.detectChanges();
    }

    public ngOnDestroy() {
        this.loaderComponent.destroy();
    }
}
