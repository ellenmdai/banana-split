const pershBabes: string[] = ["Ellen Dai", "Brooke Felsheim", "Taylor Shishido"];

export class Overview {

    date: Date;
    totalAmount: number;
    taxAmount: number;
    merchantName: string;
    participants: string[];
    purchaser?: string;
    // merchantType: string;

    constructor(receipt: any) {
        this.date = new Date(receipt.date.data);        
        this.totalAmount = receipt.totalAmount.data;
        this.taxAmount = receipt.taxAmount.data;
        this.merchantName = "Hogsmeade";
        this.participants = pershBabes;
        if (receipt.purchaser) {
            this.purchaser = receipt.purchaser;
        }
    }

    public setPurchaser(purchaser: string) {
        this.purchaser = purchaser;
    }

}