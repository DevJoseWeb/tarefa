import * as moment_ from "moment";
import { Pipe, PipeTransform } from "@angular/core";

const moment = moment_; // @HACK Necessary because of https://github.com/rollup/rollup/issues/670

@Pipe({
    name: `localizedDate`,
    pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
    public transform(value: any, format: string = `L LTS`): any {
        return value ? moment(value).format(format) : value;
    }
}
