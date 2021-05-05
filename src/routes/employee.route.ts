import { Router } from 'express';
import staffManagementController from '../controllers/employee.controller';
import { EmployeeDto } from '../dtos/employee.dtos';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import vacationController from '../controllers/vacation.controller';
import staffMiddleware from '../middlewares/staff.middleware';

class staffManagementRoute implements Route {
  public employeePath = '/:phoneNumber(\\d+)/employee';
  public vacationPath = '/:phoneNumber(\\d+)/vacations';
  public router = Router();
  public staffManagementController = new staffManagementController();
  public vacationController = new vacationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.employeePath}/:employeeId?`, this.staffManagementController.getEmployees);
    this.router.get(`${this.vacationPath}/:employeeId?`, this.vacationController.getVacations);
    this.router.post(`${this.employeePath}`, staffMiddleware(), validationMiddleware(EmployeeDto, 'body'), this.staffManagementController.addEmployee);
    this.router.post(`${this.vacationPath}/:employeeId`, this.vacationController.addVacation);
    this.router.put(
      `${this.employeePath}/:emp_id`,
      staffMiddleware(),
      validationMiddleware(EmployeeDto, 'body', true),
      this.staffManagementController.updateEmployees,
    );
    this.router.put(`${this.vacationPath}/:employeeId/:vacationId`, this.vacationController.updateVacation);
    this.router.delete(`${this.employeePath}/:employeeId`, this.staffManagementController.deleteEmployee);
    this.router.delete(`${this.vacationPath}/:employeeId/:vacationId`, this.vacationController.deleteVacation);
    this.router.use(`${this.employeePath}`, (req, res) => {
      var methods = ['GET', 'POST', 'PUT', 'DELETE'];

      if (methods.includes(req.method)) {
        res.status(400).json({
          status: 400,
          message: 'Bad request. Refer docs for more info => https://docs.bigbusinessapp.com',
          data: {},
        });
      } else {
        res.status(405).json({
          status: 405,
          message: 'The requested method ' + req.method + ' is not allowed',
          data: {},
        });
      }
    });
  }
}

export default staffManagementRoute;
