import {Employee} from '../interfaces/employee.interface';

const employeeModel : Employee[] = [
    { 
        "emp_id" : "101",
        "name" : "Darshit",
	    "age" : "25",
	    "phoneNumber" : 789873198 ,
	    "joiningDate" : "24th feb,2021",
	    "designation" : "",
	    "emailId" : "abcd@gmail.com",
	    "PaymentDetails" : {
            "curr_salary" : 10000,
            "baseSalary" :  14000,
            "bonus" : 500,
            "lastPaidOn" : "25th Jan,2021",
            "amountPaid" : 12000,
            "advancePayment" : 2000,
            "taxDetails" : 0,
            "providentFund" : 500,
            "paymentDue" : 200, 
        },
	    "status" : "Currently working"
    }];


export default employeeModel;