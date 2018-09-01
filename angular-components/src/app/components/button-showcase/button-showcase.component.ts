import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

import { MessageService } from "primeng/components/common/messageservice";
import { people } from "~resources/people";

@Component({
    templateUrl: "./button-showcase.component.html",
    styleUrls: ["./button-showcase.component.scss"],
})
export class ButtonShowcaseComponent {
    public gridData: any[] = people;
    public gridColumns: any[] = [{ field: "id", header: "Id" }, { field: "name", header: "Nome" }, { field: "age", header: "Idade" }];
    public disabled = false;
    public auxiliary = true;
    public favorite = false;

    constructor(private messageService: MessageService) {}

    public action(name: string) {
        this.messageService.add({ summary: "Ação", detail: `Botão de ${name} clicado!`, severity: "info" });
    }

    public getActions(data?: any): MenuItem[] {
        return [
            {
                id: "text",
                label: "Texto muito grande para um menu",
                command: () => console.log(data),
                icon: "fa fa-fw fa-file-text",
                items: [
                    {
                        id: "1",
                        label: "Ação 1",
                    },
                    {
                        id: "2",
                        label: "Ação 2",
                    },
                    {
                        id: "3",
                        label: "Ação 3",
                    },
                ],
            },
            { separator: true },
            {
                id: "1",
                label: "Ação 1",
            },
            {
                id: "2",
                label: "Ação 2",
            },
            {
                id: "3",
                label: "Ação 3",
            },
            { id: "cool", label: "¯\\_(ツ)_/¯", command: () => console.log(data) },
        ];
    }
}
