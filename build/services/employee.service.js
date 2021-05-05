"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseManager_1 = __importDefault(require("../Dbmanagers/firebase/FirebaseManager"));
class EmployeeService {
    constructor() {
        this.db = new FirebaseManager_1.default();
    }
    async createEmployee(phoneNumber, EmployeeData) {
        return new Promise((resolve, reject) => {
            this.db
                .createEmployee(phoneNumber, EmployeeData, EmployeeData.emp_id)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    async readEmployeeData(phoneNumber, empId) {
        return new Promise((resolve, reject) => {
            this.db
                .getEmployee(phoneNumber, empId)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    async updateEmployee(phoneNumber, empId, EmployeeData) {
        return new Promise((resolve, reject) => {
            this.db
                .updateEmployee(phoneNumber, EmployeeData, empId)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    async deleteEmployee(phoneNumber, empId) {
        return new Promise((resolve, reject) => {
            this.db
                .deleteEmployee(phoneNumber, empId)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map