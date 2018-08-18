const pershBabes: Array<string> = new Array<string>("Ellen Dai", "Brooke Felsheim", "Taylor Shishido");

export class Overview {

    date: Date;
    totalAmount: number;
    taxAmount: number;
    merchantName: string;
    participants: Array<string>;
    purchaser?: string;
    // merchantType: string;

    constructor(receipt: any) {
        this.date = new Date(receipt.date.data);        
        this.totalAmount = receipt.totalAmount.data;
        this.taxAmount = receipt.taxAmount.data;
        this.merchantName = "Hogsmeade";
        this.participants = pershBabes;
    }

    public setPurchaser(purchaser: string) {
        this.purchaser = purchaser;
    }

}