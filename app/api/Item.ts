export class Item {

    name: string;
    price: number;
    split?: number;
    people?: string[];

    constructor(entry: any) {
        this.name = entry.text;
        this.price = entry.data;
    }

    public toString() {
        return this.name + ": total $" + this.price + ", split between " + this.people + " at $" + this.split + " each.";
    }

}