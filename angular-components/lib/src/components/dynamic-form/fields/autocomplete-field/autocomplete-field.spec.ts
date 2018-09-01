import { BehaviorSubject } from "rxjs";

import { FieldType } from "../../configurations/field-type";
import { AutocompleteField } from "./autocomplete-field";

describe("AutocompleteField", () => {
    it("should subscribe on the #suggestionsObservable correctly", () => {
        const mockObservable1 = new BehaviorSubject([]);
        const mockObservable2 = new BehaviorSubject([]);
        const mockSearchResult = ["Brazil", "Argentina"];
        const props = {
            name: "countries",
            type: FieldType.Autocomplete,
            label: "Países",
            tooltip: "Países",
        };

        spyOn(mockObservable2, "subscribe");

        let autocomplete = new AutocompleteField({
            ...props,
            onSearch: () => mockObservable2.next(mockSearchResult),
            suggestionsObservable: mockObservable2,
            dataKey: "",
            size: {},
        });

        expect(mockObservable2.subscribe).toHaveBeenCalled();

        autocomplete = new AutocompleteField({
            ...props,
            onSearch: () => mockObservable1.next(mockSearchResult),
            suggestionsObservable: mockObservable1,
            dataKey: "",
            size: {},
        });

        autocomplete.onSearch("");
        expect(autocomplete.suggestions).toBe(mockSearchResult);
    });
});
