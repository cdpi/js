interface BankMaster {
    entryType: string;
    bankOrInstitutionName?: string;
    sicParticipation: boolean;
    rtgsCustomerPaymentsChf: boolean;
    ipCustomerPaymentsChf: boolean;
    euroSicParticipation: boolean;
    lsvBddChfParticipation: boolean;
    lsvBddEurParticipation: boolean;
    iid: number;
    validOn: string;
    bic: string;
    country: string;
    headQuarters: number;
    iidType: string;
    postCode: string;
    sicIid: string;
    streetName: string;
    townName: string;
}
interface BankMasterResponse {
    totalSize: number;
    validOn: string;
    readTime: string;
    entries: BankMaster[];
}
declare function sixGroupAPI(): Promise<BankMasterResponse>;
declare function check(iban: string): boolean;
export { check, sixGroupAPI };
