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
const firebase = __importStar(require("firebase"));
class FirebaseManager {
    constructor() {
        this.dbURL = process.env.DB_URL;
        this.section = 'Staff-Management';
        this.section2 = 'vacation';
        firebase.default.initializeApp({
            databaseURL: this.dbURL,
            serviceAccount: './bigbusinessFirebaseDev100.json',
        });
        this.db = firebase.default.database();
        this.StaffManagementRef = this.db.ref('Users');
    }
    static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
    validateStaffManagementId(phoneNumber, id) {
        return new Promise((resolve, reject) => {
            var path = this.StaffManagementRef.child(phoneNumber).child(this.section);
            path.once('value', snapshot => {
                if (snapshot.val() == null) {
                    var error = {
                        status: 404,
                        data: {},
                        message: 'No Employee Data Found',
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
                            var er = {
                                status: 404,
                                data: {},
                                message: 'invalid Employee id',
                            };
                            reject(er);
                        }
                    }
                    else {
                        var e = {
                            status: 404,
                            data: {},
                            message: 'No data found to update',
                        };
                        reject(e);
                    }
                }
            });
        });
    }
    getEmployee(phoneNumber, id) {
        return new Promise((resolve, reject) => {
            var path = id
                ? this.StaffManagementRef.child(phoneNumber).child(this.section).child(id)
                : this.StaffManagementRef.child(phoneNumber).child(this.section);
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
                    var respo = {
                        status: 200,
                        message: 'Successful',
                        data: snapshot.val(),
                    };
                    // resolve(respo);
                    resolve(snapshot.val());
                }
            });
        });
    }
    createEmployee(phoneNumber, data, id) {
        return new Promise((resolve, reject) => {
            var path = this.StaffManagementRef.child(phoneNumber)
                .child(this.section)
                .child(id)
                .push(data)
                .then(s => {
                // data['id'] = s.key.toString();
                this.StaffManagementRef.child(phoneNumber)
                    .child(this.section)
                    .child(id)
                    .set(data)
                    .then(() => {
                    var respo = {
                        status: 200,
                        message: 'Added successfully',
                        data: data,
                    };
                    //   resolve(respo);
                    resolve(data);
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
    updateEmployee(phoneNumber, data, id) {
        return new Promise((resolve, reject) => {
            this.validateStaffManagementId(phoneNumber, id)
                .then(() => {
                this.StaffManagementRef.child(phoneNumber)
                    .child(this.section)
                    .child(id)
                    .update(data)
                    .then(() => {
                    var respo = {
                        status: 200,
                        message: 'Successfully updated',
                        data: data,
                    };
                    // resolve(respo);
                    resolve(data);
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
    deleteEmployee(phoneNumber, id) {
        return new Promise((resolve, reject) => {
            this.validateStaffManagementId(phoneNumber, id)
                .then(() => {
                this.StaffManagementRef.child(phoneNumber)
                    .child(this.section)
                    .child(id)
                    .remove()
                    .then(() => {
                    // resolve({
                    //   status: 200,
                    //   data: {},
                    //   message: 'Employee removed successfully from the staff management ' + id,
                    // });
                    resolve({ message: 'Employee removed successfully from the staff management ' + id });
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
}
exports.default = FirebaseManager;
//# sourceMappingURL=FirebaseManager.js.map