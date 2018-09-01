import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./empty-state-showcase.component.html",
})
export class EmptyStateShowcaseComponent implements OnInit {
    possibleData = this.getPossibleData();

    gridData: any[] = [];
    gridColumns: any[];

    ngOnInit() {
        this.gridColumns = [{ field: "name", header: "Nome" }, { field: "age", header: "Idade" }];

        for (let i = 0; i < 3; i++) {
            this.insertRandomData();
        }
    }

    getPossibleData() {
        let id = 0;
        return [
            { id: id++, name: "Joseph Klimber", age: 40 },
            { id: id++, name: "Walter White", age: 50 },
            { id: id++, name: "Tiago Dionesto", age: new Date().getFullYear() - 1993 },
            { id: id++, name: "Crash Bandicoot", age: 15 },
            { id: id++, name: "Han Solo", age: 47 },
            { id: id++, name: "Cersei Lannister", age: 42 },
            { id: id++, name: "Homer Simpson", age: 55 },
            { id: id++, name: "Capitu", age: 14 },
            { id: id++, name: "Jesse Pinkman", age: 27 },
            { id: id++, name: "Magalenha Rojão", age: 30 },
            { id: id++, name: "Demogorgon", age: -666 },
        ];
    }

    insertRandomData(): void {
        const randomIndex = Math.floor(Math.random() * this.possibleData.length);
        const element = this.possibleData[randomIndex];

        if (this.gridData.length >= this.possibleData.length) return;
        if (this.gridData.includes(element)) return this.insertRandomData();

        this.gridData.push(element);
    }

    removeData() {
        this.gridData = this.gridData.splice(0, this.gridData.length - 1);
    }
}
