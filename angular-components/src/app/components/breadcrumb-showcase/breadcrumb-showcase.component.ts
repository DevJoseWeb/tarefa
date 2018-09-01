import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./breadcrumb-showcase.component.html",
})
export class BreadcrumbShowcaseComponent implements OnInit {
    public showUp = true;
    public showDown = true;

    constructor(private router: Router, private route: ActivatedRoute) {}

    navigateUp() {
        this.router.navigate(["../"], { relativeTo: this.route.parent });
    }

    navigateDown() {
        this.router.navigate(["child"], { relativeTo: this.route.parent });
    }

    ngOnInit() {
        if (this.route.parent.routeConfig.path == "breadcrumb") this.showUp = false;
        if (this.route.parent.routeConfig.children.length <= 1) this.showDown = false;
    }
}
