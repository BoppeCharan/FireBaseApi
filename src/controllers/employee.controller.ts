import { NextFunction, Request, Response } from 'express';
import { EmployeeDto } from '../dtos/employee.dtos';
import { Employee } from '../interfaces/employee.interface';
import EmployeeService from '../services/employee.service';

class staffManagementController {

  private employeeServicee = new EmployeeService();

  public getEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      var PhoneNumber = req.params.phoneNumber;
      var employeeId = req.params.employeeId;

      this.employeeServicee
        .readEmployeeData(PhoneNumber, employeeId)
        .then(s => {
          res.status(200).json({ status: 200, data: s, message: "Employee Details" });
        })
        .catch(e => {
          res.status(e.status).json(e);
        });
    } catch (error) {
      next({ status: 404, data: null, message: error });
    }
  };

  public updateEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const employeeId = req.params.emp_id;
      const transaction: EmployeeDto = req.body;

      this.employeeServicee
        .updateEmployee(phoneNumber, employeeId, transaction)
        .then(s => {
          res.status(200).json({ status: 200, data: s, message: "Updated Employees Data..!!" });
        })
        .catch(e => {
          res.status(e.status).json(e);
        });
    } catch (e) {
      next({ status: 404, data: null, message: e });
    }
  };

  public deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const employeeId = req.params.employeeId;

      this.employeeServicee
        .deleteEmployee(phoneNumber, employeeId)
        .then(data => {
          res.status(200).json({ status: 200, data: data, message: "Employee Data is Deleted" });
        })
        .catch(e => {
          next(e);
        });
    } catch (e) {
      next({ status: 404, data: null, message: e });
    }
  };


  public addEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employee: EmployeeDto = req.body;
      const phoneNumber = req.params.phoneNumber;

      this.employeeServicee
        .createEmployee(phoneNumber, employee)
        .then(s => {
          res.status(200).json({ status: 200, data: s, message: "Employee is Created" });
        })
        .catch(e => {
          res.status(e.status).json(e);
        });
    } catch (e) {
      next({ status: 404, data: null, message: e });
    }
  };
}

export default staffManagementController;