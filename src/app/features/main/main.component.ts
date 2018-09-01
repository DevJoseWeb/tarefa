import { Component } from "@angular/core";
import { environment } from "~src/environments/environment";

@Component({
    templateUrl: "./main.component.html",
})
export class MainComponent {
    public dependencies = environment.project.serviceDependencies;
}
