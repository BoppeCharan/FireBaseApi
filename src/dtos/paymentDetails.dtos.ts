import { IsString, IsNumber } from 'class-validator';


export class PaymentDetailsDto {
    @IsNumber()
    public curr_salary: number;
    @IsNumber()
    public baseSalary: number;
    @IsNumber()
    public amountPaid: number;
    @IsNumber()
    public advancePayment: number;
    @IsNumber()
    public taxDetails: number;
    @IsNumber()
    public providentFund: number;
    @IsNumber()
    public paymentDue: number;

    @IsString()
    public lastPaidOn: string;
}