import { IsString } from 'class-validator';
import { PaymentDetailsDto } from './paymentDetails.dtos';

export class EmployeeDto {
	@IsString()
	public emp_id: string;
	@IsString()
	public firstName: string;
	@IsString()
	public age: string;
	@IsString()
	public phoneNumber: string;
	@IsString()
	public joiningDate: string;
	@IsString()
	public designation: string;
	@IsString()
	public emailId: string;
	@IsString()
	public status: string;
	@IsString()
	public address: string;
}