import { Item } from "./Item";

export class ReceiptOverview {

    date: Date;
    totalAmount: number;
    taxAmount: number;
    merchantName: string;
    items: Item[]

    constructor(receipt: any) {
        this.date = new Date(receipt.date.data);        
        this.totalAmount = receipt.totalAmount.data;
        this.taxAmount = receipt.taxAmount.data;
        this.merchantName = "Hogsmeade";
        this.items = [];

        var items = receipt.lineAmounts;
        items.forEach(i => {
            this.items.push(new Item(i));
        });
    }

    public setMerchantName(name: string) {
        this.merchantName = name;
    }

    public setDate(date: Date) {
        this.date = date;
    }

    public setTotalAmount(amt: number) {
        this.totalAmount = amt;
    }

    public setTaxAmount(tax: number) {
        this.taxAmount = tax;
    }

}