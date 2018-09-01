export class CalendarOptions {
    hourFormat = "24";
    dateFormat = "dd/mm/yy";
    firstDayOfWeek = 0;
    today = "Hoje";
    clear = "Limpar";
    dayNames: string[] = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    dayNamesShort: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    dayNamesMin: string[] = ["D", "S", "T", "Q", "Q", "S", "S"];
    monthNamesShort: string[] = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"];
    monthNames: string[] = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
}

export class CurrencyOptions {
    align = "left";
    allowNegative = true;
    allowZero = true;
    prefix = "R$ ";
    suffix = "";
    thousands = ".";
    decimal = ",";
    precision = 2;
}

export class LocaleOptions {
    calendar: CalendarOptions;
    currency: CurrencyOptions;
}

export const DEFAULT_CALENDAR_OPTIONS = new CalendarOptions();
export const DEFAULT_CURRENCY_OPTIONS = new CurrencyOptions();
