import { Injectable } from "@angular/core";
import { SortMeta } from "primeng/components/common/api";

import { countries } from "~resources/countries";

@Injectable()
export class MultiSelectShowcaseService {
    getCountries(query: string) {
        return new Promise(resolve => {
            resolve({ data: this.filterCountry(query, 1) });
        });
    }

    filterCountry(countryName: string, page: number = 1): any[] {
        const values = Object.values(countries).filter(({ name }) => name.toLowerCase().includes(countryName.toLowerCase()));
        return this.getPaginated(values, page);
    }

    queryFilterCountry(filterData: any, page: number = 1, sortMeta: SortMeta[]) {
        let results = Object.values(countries).filter(country => {
            return !Object.keys(filterData).find(filterField => {
                const filterValue = filterData[filterField];
                return filterValue && !country[filterField].toLowerCase().includes(filterValue.toLowerCase());
            });
        });

        if (sortMeta && sortMeta.length) {
            results = results.sort((a: any, b: any) => {
                for (const sort of sortMeta) {
                    const { field, order } = sort;
                    const sortResult = a[field].localeCompare(b[field]) * order;
                    if (sortResult) return sortResult;
                }
                return 0;
            });
        }

        return new Promise(resolve => {
            const values = this.getPaginated(results, page, 10);
            setTimeout(() => {
                resolve({
                    data: values,
                    totalRecords: results.length,
                });
            }, 1000);
        });
    }

    getPaginated(results: any, page = 1, qtd = 10) {
        return results.filter((c: any, i: number) => i >= qtd * page - qtd && i < qtd * page);
    }
}
