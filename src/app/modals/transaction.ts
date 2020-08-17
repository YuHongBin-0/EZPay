export interface Transaction {
    transactionID: string;
    amount: number;
    from: string;
    fromName: string;
    to: string;
    date: string;
    notes: string;
    transactionType: string;
}