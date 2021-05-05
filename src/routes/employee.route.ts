import { Router } from 'express';
import staffManagementController from '../controllers/employee.controller';
import { EmployeeDto } from '../dtos/employee.dtos';
import { AttendanceDto } from '../dtos/attendance.dtos';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import vacationController from '../controllers/vacation.controller';
import staffMiddleware from '../middlewares/staff.middleware';
import AttendanceController from '../controllers/attendance.controller';
import { from } from 'rxjs';

class staffManagementRoute implements Route {
  public path = '/:phoneNumber(\\d+)/employee';
  public path1 = '/:phoneNumber(\\d+)/attendance';
  public router = Router();
  public staffManagementController = new staffManagementController();
  public vacationController = new vacationController();
  public attendanceController = new AttendanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:employeeId?`, this.staffManagementController.getEmployees);
    this.router.get(`${this.path}/:employeeId/vacation`, this.vacationController.getVacations);
    this.router.get(`${this.path1}/:employeeId`,this.attendanceController.getAttendances);
    this.router.post(`${this.path1}/:employeeId`,validationMiddleware(AttendanceDto, 'body'),this.attendanceController.addAttendance);
    this.router.post(`${this.path}`, staffMiddleware(), validationMiddleware(EmployeeDto, 'body'), this.staffManagementController.addEmployee);
    this.router.post(`${this.path}/:employeeId`, this.vacationController.addVacation);
    this.router.put(
      `${this.path}/:emp_id`,
      staffMiddleware(),
      validationMiddleware(EmployeeDto, 'body', true),
      this.staffManagementController.updateEmployees,
    );
    this.router.put(
      `${this.path1}/:employeeId/:id`,
      validationMiddleware(AttendanceDto, 'body', true),
      this.attendanceController.updateAttendance,
    );
    // this.router.put(`${this.path}/:phoneNumber(\\d+)/:employeeId/vacation`, this.vacationController.updateVacation);
    this.router.delete(`${this.path}/:employeeId`, this.staffManagementController.deleteEmployee);
    this.router.delete(`${this.path1}/:employeeId/:id`, this.attendanceController.deleteAttendance);
    this.router.delete(`${this.path}/:employeeId/vacation`, this.vacationController.deleteVacation);
    this.router.use(`${this.path}`, (req, res) => {
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
