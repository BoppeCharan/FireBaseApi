import {IsString , IsNumber} from 'class-validator';


export class PaymentDetailsDto {
    @IsNumber()
    public curr_salary : number;
	public baseSalary : number;
    public amountPaid : number;
	public advancePayment : number;
    public taxDetails : number;
	public providentFund : number;
	public paymentDue : number; 

    @IsString()
    public lastPaidOn : string;
}