export interface Transaction {
    transactionID: string;
    amount: number;
    from: string;
    to: string;
    notes: string;
    transactionType: string;
}