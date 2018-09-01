export class FieldSize {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;

    constructor({ sm = 12, md = 6, lg = 6, xl = 6 }: FieldSize) {
        this.sm = sm;
        this.md = md;
        this.lg = lg;
        this.xl = xl;
    }
}
