import { CalendarOptions, DEFAULT_CALENDAR_OPTIONS } from "../../locale/locale";
import { Field, FieldConfig } from "./field";

export interface CalendarConfig extends FieldConfig {
    calendarOptions?: CalendarOptions;
}

export class CalendarField extends Field {
    public calendarOptions: CalendarOptions;

    constructor(config: CalendarConfig) {
        super(config);
        this.calendarOptions = config.calendarOptions || DEFAULT_CALENDAR_OPTIONS;
    }
}
