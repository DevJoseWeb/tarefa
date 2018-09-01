import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

@Component({
    selector: `s-breadcrumb`,
    templateUrl: `./breadcrumb.component.html`,
})
export class BreadcrumbComponent implements OnDestroy {
    @Input() public homeUrl: string;
    public home: MenuItem;
    public items: MenuItem[];
    public title: string;

    private ngUnsubscribe = new Subject();

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe), filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.onNavigationEnd());
    }

    private onNavigationEnd() {
        const currentRoute = this.activatedRoute.root;
        const validRoutes: ActivatedRoute[] = this.getValidChildren(currentRoute);

        this.title = this.getCurrentTitle(validRoutes);
        this.home = this.getCurrentHome(validRoutes);
        this.items = this.getCurrentItems(validRoutes);
    }

    private getValidChildren(route: ActivatedRoute): ActivatedRoute[] {
        const valid = route.routeConfig && route.routeConfig.path && route.routeConfig.component && route.outlet === PRIMARY_OUTLET;
        return route.children.reduce((validRoutes, child) => [...validRoutes, ...this.getValidChildren(child)], valid ? [route] : []);
    }

    private getCurrentTitle(routes: ActivatedRoute[]) {
        const last = routes[routes.length - 1];
        if (last && last.routeConfig) return this.getTitle(last);
    }

    private getCurrentHome(routes: ActivatedRoute[]) {
        let home;

        if (this.homeUrl) home = { url: this.homeUrl, icon: "fa fa-home" };
        else if (routes.length) home = { ...this.getMenuItem(routes[0], routes.length === 1), icon: "fa fa-home" };

        return home;
    }

    private getCurrentItems(routes: ActivatedRoute[]) {
        if (!routes.length) return;
        const items = this.homeUrl ? routes : routes.slice(1);
        if (items.length) return items.map((route, i) => this.getMenuItem(route, i === routes.length - 1));
    }

    private getMenuItem(route: ActivatedRoute, disabled = false) {
        const label = this.getTitle(route);
        const routes = route.pathFromRoot;
        const routerLink = routes
            .slice(0, routes.indexOf(route) + 1)
            .reduce((result, item) => [...result, ...item.snapshot.url.map(url => url.path)], ["/"]);

        return {
            label,
            routerLink,
            queryParams: route.snapshot.queryParams,
            routerLinkActiveOptions: { exact: true },
            disabled,
        };
    }

    private getTitle(route: ActivatedRoute) {
        const { snapshot, routeConfig } = route;
        const title = snapshot.data.routeTitle;
        if (!title) throw new Error(`No routeTitle defined for the route /${routeConfig.path}`);
        return title;
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
