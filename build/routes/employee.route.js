"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const employee_dtos_1 = require("../dtos/employee.dtos");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const vacation_controller_1 = __importDefault(require("../controllers/vacation.controller"));
const staff_middleware_1 = __importDefault(require("../middlewares/staff.middleware"));
class staffManagementRoute {
    constructor() {
        this.path = '/:phoneNumber(\\d+)/employee';
        this.router = express_1.Router();
        this.staffManagementController = new employee_controller_1.default();
        this.vacationController = new vacation_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:employeeId?`, this.staffManagementController.getEmployees);
        this.router.get(`${this.path}/:employeeId/vacation`, this.vacationController.getVacations);
        this.router.post(`${this.path}`, staff_middleware_1.default(), validation_middleware_1.default(employee_dtos_1.EmployeeDto, 'body'), this.staffManagementController.addEmployee);
        this.router.post(`${this.path}/:employeeId`, this.vacationController.addVacation);
        this.router.put(`${this.path}/:emp_id`, staff_middleware_1.default(), validation_middleware_1.default(employee_dtos_1.EmployeeDto, 'body', true), this.staffManagementController.updateEmployees);
        // this.router.put(`${this.path}/:phoneNumber(\\d+)/:employeeId/vacation`, this.vacationController.updateVacation);
        this.router.delete(`${this.path}/:employeeId`, this.staffManagementController.deleteEmployee);
        this.router.delete(`${this.path}/:employeeId/vacation`, this.vacationController.deleteVacation);
        this.router.use(`${this.path}`, (req, res) => {
            var methods = ['GET', 'POST', 'PUT', 'DELETE'];
            if (methods.includes(req.method)) {
                res.status(400).json({
                    status: 400,
                    message: 'Bad request. Refer docs for more info => https://docs.bigbusinessapp.com',
                    data: {},
                });
            }
            else {
                res.status(405).json({
                    status: 405,
                    message: 'The requested method ' + req.method + ' is not allowed',
                    data: {},
                });
            }
        });
    }
}
exports.default = staffManagementRoute;
//# sourceMappingURL=employee.route.js.map