import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";

@Injectable()
export class UtilService {

  constructor(
    private translate: TranslateService
  ) {}

  private dateRegex: RegExp = /(([0-9]{4})-([0-9]{2})-([0-9]{2}))/;

  public getEnumOptions(en: any): any[] {
    return Object.keys(en).filter(f => !isNaN(Number(f))).map((value) => {
      return {
        name: this.translate.instant(`enum_${en[value]}`),
        value: en[value]
      };
    });
  }

  /*
  * Transforma as datas em objeto date em um array de objetos (collection)
  */
  public datefyCollection(arr: any[]) {
    return arr.map((item: object) => this.datefyProps(item));
  }

  public datefyProps(item: object): object {
    return Object.keys(item).map((prop: string) => {
      const handler = {};
      if (this.dateRegex.test(item[prop])) {
        handler[prop] = moment(item[prop]).toDate();
      } else if (typeof item[prop] === "object") {
        handler[prop] = this.datefyProps(item[prop]);
      } else if (item[prop] instanceof Array && typeof item[prop][0] === "object") {
        this.datefyCollection(item[prop]);
      } else {
        handler[prop] = item[prop];
      }
      return handler;
    }).reduce((p: any, n: any) => ({...p, ...n}), {});
  }

}
