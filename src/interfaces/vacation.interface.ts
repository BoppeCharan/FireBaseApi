export interface vacation {
    vacationId:string;
    period: string;
    startDate: string; // dd/mm/yyyy
    endDate: string; // dd/mm/yyyy
    status: string; // approved, submitted, cancelled, rejected
}