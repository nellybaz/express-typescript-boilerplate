export interface TalentContractData {
    amount: number;
    payerEmail: string;
    owner: string;
    dueDate?: Date;
    currency: string;
    isPaid?: boolean;
    contractName: string;
    description: string;
    emailSent?: boolean;
}
