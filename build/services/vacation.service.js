"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vacationFirebaseManager_1 = __importDefault(require("../Dbmanagers/firebase/vacationFirebaseManager"));
class VacationService {
    constructor() {
        this.db = new vacationFirebaseManager_1.default();
    }
    async createEmployeeVacation(phoneNumber, VacationData, id) {
        return new Promise((resolve, reject) => {
            this.db
                .createEmployeeVacation(phoneNumber, VacationData, id)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    async readVacationData(phoneNumber, id) {
        return new Promise((resolve, reject) => {
            this.db
                .getVacation(phoneNumber, id)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    async updateVacation(phoneNumber, VacationData, empId, vacationId) {
        return new Promise((resolve, reject) => {
            this.db
                .updateVacation(phoneNumber, VacationData, empId, vacationId)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    async deleteVacation(phoneNumber, id, vacationId) {
        return new Promise((resolve, reject) => {
            this.db
                .deleteVacation(phoneNumber, id, vacationId)
                .then(s => {
                resolve(s);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
}
exports.default = VacationService;
//# sourceMappingURL=vacation.service.js.map