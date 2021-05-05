"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference lib="dom" />
const fb = __importStar(require("firebase"));
class VacationFirebaseManager {
    constructor() {
        this.dbURL = process.env.DB_URL;
        this.section = 'Staff-Management';
        this.section2 = 'vacations';
        this.db = fb.default.database();
        this.VacationRef = this.db.ref('Users');
    }
    validateStaffManagementId(phoneNumber, id) {
        return new Promise((resolve, reject) => {
            var path = this.VacationRef.child(phoneNumber).child(this.section).child(this.section2);
            path.once('value', snapshot => {
                if (snapshot.val() == null) {
                    var error = {
                        status: 404,
                        data: {},
                        message: 'No Employee Vacation Data Found',
                    };
                    reject(error);
                }
                else {
                    var ths = Object.keys(snapshot.toJSON());
                    if (ths.length) {
                        if (ths.includes(id)) {
                            resolve(true);
                        }
                        else {
                            var e = {
                                status: 404,
                                data: {},
                                message: 'invalid Employee id',
                            };
                            reject(e);
                        }
                    }
                    else {
                        var er = {
                            status: 404,
                            data: {},
                            message: 'No data found to update',
                        };
                        reject(er);
                    }
                }
            });
        });
    }
    getVacation(phoneNumber, id) {
        return new Promise((resolve, reject) => {
            var path = this.VacationRef.child(phoneNumber).child(this.section).child(this.section2);
            path.once('value', snapshot => {
                if (snapshot.val() == null) {
                    var error = {
                        status: 403,
                        data: {},
                        message: 'No Data Found',
                    };
                    reject(error);
                }
                else {
                    var re = {
                        status: 200,
                        data: snapshot.val(),
                        message: 'successful',
                    };
                    resolve(re);
                }
            });
        });
    }
    createEmployeeVacation(phoneNumber, data, id) {
        return new Promise((resolve, reject) => {
            var path = this.VacationRef.child(phoneNumber)
                .child(this.section)
                .child(this.section2)
                .child(id)
                .set(data)
                .then(() => {
                var respo = {
                    status: 200,
                    message: 'Added successfully',
                    data: data,
                };
                resolve(respo);
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    updateVacation(phoneNumber, data, id) {
        return new Promise((resolve, reject) => {
            this.validateStaffManagementId(phoneNumber, id)
                .then(() => {
                this.VacationRef.child(phoneNumber)
                    .child(this.section)
                    .child(this.section2)
                    .update(data)
                    .then(() => {
                    var respo = {
                        status: 200,
                        message: 'Successfully updated',
                        data: data,
                    };
                    resolve(respo);
                })
                    .catch(e => {
                    reject(e);
                });
            })
                .catch(e => {
                reject(e);
            });
        });
    }
    deleteVacation(phoneNumber, id) {
        return new Promise((resolve, reject) => {
            var path = this.VacationRef.child(phoneNumber).child(this.section).child(this.section2).remove();
            path
                .then(() => {
                resolve({
                    status: 200,
                    data: {},
                    message: 'Employee Vacation removed successfully from the staff management ' + id,
                });
            })
                .catch(e => {
                reject(e);
            });
        });
    }
}
exports.default = VacationFirebaseManager;
//# sourceMappingURL=vacationFirebaseManager.js.map