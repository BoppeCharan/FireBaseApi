import { IsString, IsObject, IsNumber } from 'class-validator';
import { PaymentDetailsDto } from './paymentDetails.dtos';

export class EmployeeDto {
	@IsString()
	public name: string;
	@IsString()
	public age: string;
	@IsNumber()
	public phoneNumber: number;
	@IsString()
	public joiningDate: string;
	@IsString()
	public designation: string;
	@IsString()
	public emailId: string;
	@IsString()
	public status: string;
}