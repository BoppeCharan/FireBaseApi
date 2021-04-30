"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_service_1 = __importDefault(require("../services/employee.service"));
class staffManagementController {
    constructor() {
        this.employeeServicee = new employee_service_1.default();
        this.getEmployees = async (req, res, next) => {
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
            }
            catch (error) {
                next({ status: 404, data: null, message: error });
            }
        };
        this.updateEmployees = async (req, res, next) => {
            try {
                const phoneNumber = req.params.phoneNumber;
                const employeeId = req.params.emp_id;
                const transaction = req.body;
                this.employeeServicee
                    .updateEmployee(phoneNumber, employeeId, transaction)
                    .then(s => {
                    res.status(200).json({ status: 200, data: s, message: "Updated Employees Data..!!" });
                })
                    .catch(e => {
                    res.status(e.status).json(e);
                });
            }
            catch (e) {
                next({ status: 404, data: null, message: e });
            }
        };
        this.deleteEmployee = async (req, res, next) => {
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
            }
            catch (e) {
                next({ status: 404, data: null, message: e });
            }
        };
        this.addEmployee = async (req, res, next) => {
            try {
                const employee = req.body;
                const phoneNumber = req.params.phoneNumber;
                this.employeeServicee
                    .createEmployee(phoneNumber, employee)
                    .then(s => {
                    res.status(200).json({ status: 200, data: s, message: "Employee is Created" });
                })
                    .catch(e => {
                    res.status(e.status).json(e);
                });
            }
            catch (e) {
                next({ status: 404, data: null, message: e });
            }
        };
    }
}
exports.default = staffManagementController;
//# sourceMappingURL=employee.controller.js.map