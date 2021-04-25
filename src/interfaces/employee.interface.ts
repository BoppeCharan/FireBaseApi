import { PaymentDetails } from './paymentDetails.interface'
export interface Employee {
	name: string;
	age: string;
	phoneNumber: number;
	joiningDate: string;
	designation: string;
	emailId: string;
	PaymentDetails: PaymentDetails;
	status: string;
	address: string;
}