import { Router } from 'express';
import staffManagementController from '../controllers/employee.controller';
import { EmployeeDto } from '../dtos/employee.dtos';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import employeeModel from '../models/employee.model';
import vacationController from '../controllers/vacation.controller';


class staffManagementRoute implements Route {
  public path = '/employee';
  public router = Router();
  public staffManagementController = new staffManagementController();
  public vacationController = new vacationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:phoneNumber(\\d+)/:employeeId?`, this.staffManagementController.getEmployees);
    this.router.get(`${this.path}/:phoneNumber(\\d+)/:employeeId/vacation`, this.vacationController.getVacations);
    this.router.post(
      `${this.path}/:phoneNumber(\\d+)`,
      validationMiddleware(EmployeeDto, 'body'),
      this.staffManagementController.addEmployee,
    );
    this.router.post(`${this.path}/:phoneNumber(\\d+)/:employeeId`, this.vacationController.addVacation);
    this.router.put(
      `${this.path}/:phoneNumber(\\d+)/:emp_id`,
      validationMiddleware(EmployeeDto, 'body', true),
      this.staffManagementController.updateEmployees,
    );
    // this.router.put(`${this.path}/:phoneNumber(\\d+)/:employeeId/vacation`, this.vacationController.updateVacation);
    this.router.delete(`${this.path}/:phoneNumber(\\d+)/:employeeId`, this.staffManagementController.deleteEmployee);
    this.router.delete(`${this.path}/:phoneNumber(\\d+)/:employeeId/vacation`, this.vacationController.deleteVacation);
  }
}

export default staffManagementRoute;