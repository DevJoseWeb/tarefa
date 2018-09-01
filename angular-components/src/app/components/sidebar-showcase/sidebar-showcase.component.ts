import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ConfirmationService } from "primeng/api";

@Component({
    templateUrl: "./sidebar-showcase.component.html",
    styleUrls: ["./sidebar-showcase.component.scss"],
})
export class SidebarShowcaseComponent {
    public visible = false;
    public formGroup: FormGroup;
    public sidebarText = "Conteúdo do sidebar.".padEnd(10000, " Conteúdo do sidebar.");

    constructor(private confirmationService: ConfirmationService) {}

    public open() {
        this.visible = true;
    }

    public close(confirm?: boolean) {
        if (confirm) {
            this.confirmationService.confirm({
                message: "Você realmente deseja cancelar? As informações não salvas serão perdidas.",
                accept: () => (this.visible = false),
            });
        } else {
            this.visible = false;
        }
    }
}
