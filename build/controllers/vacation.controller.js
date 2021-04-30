"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vacation_service_1 = __importDefault(require("../services/vacation.service"));
class vacationController {
    constructor() {
        this.vacationServicee = new vacation_service_1.default();
        this.getVacations = async (req, res, next) => {
            try {
                var PhoneNumber = req.params.phoneNumber;
                var employeeId = req.params.employeeId;
                this.vacationServicee
                    .readVacationData(PhoneNumber, employeeId)
                    .then(s => {
                    res.status(200).json(s);
                })
                    .catch(e => {
                    res.status(e.status).json(e);
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateVacation = async (req, res, next) => {
            try {
                const phoneNumber = req.params.phoneNumber;
                const employeeId = req.params.emp_id;
                const vacation = req.body;
                this.vacationServicee
                    .updateVacation(phoneNumber, vacation, employeeId)
                    .then(s => {
                    res.status(200).json(s);
                })
                    .catch(e => {
                    res.status(e.status).json(e);
                });
            }
            catch (e) {
                next(e);
            }
        };
        this.deleteVacation = async (req, res, next) => {
            try {
                const phoneNumber = req.params.phoneNumber;
                const employeeId = req.params.employeeId;
                this.vacationServicee
                    .deleteVacation(phoneNumber, employeeId)
                    .then(data => {
                    res.status(200).json(data);
                })
                    .catch(e => {
                    next(e);
                });
            }
            catch (e) {
                next(e);
            }
        };
        this.addVacation = async (req, res, next) => {
            try {
                const vacation = req.body;
                const phoneNumber = req.params.phoneNumber;
                const id = req.params.employeeId;
                this.vacationServicee
                    .createEmployeeVacation(phoneNumber, vacation, id)
                    .then(s => {
                    res.status(200).json(s);
                })
                    .catch(e => {
                    res.status(e.status).json(e);
                });
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.default = vacationController;
//# sourceMappingURL=vacation.controller.js.map