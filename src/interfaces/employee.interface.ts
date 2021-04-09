import {PaymentDetails} from './paymentDetails.interface'
export interface Employee{
    emp_id : string;
	name : string;
	age : string;
	phoneNumber : number;
	joiningDate : string;
	designation : string;
	emailId : string;
	PaymentDetails : PaymentDetails;
	status : string;
}