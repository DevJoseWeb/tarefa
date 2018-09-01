import * as moment_ from "moment";
import { Pipe, PipeTransform } from "@angular/core";

const moment = moment_; // @HACK Necessary because of https://github.com/rollup/rollup/issues/670

@Pipe({
    name: `localizedTime`,
    pure: false,
})
export class LocalizedTimePipe implements PipeTransform {
    public transform(value: any, format: string = `LTS`): any {
        return value ? moment(value, `HH:mm:ss`).format(format) : value;
    }
}
