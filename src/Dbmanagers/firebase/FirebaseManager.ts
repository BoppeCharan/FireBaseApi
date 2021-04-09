/// <reference lib="dom" />
import * as firebase from 'firebase';
import { EmployeeDto } from '../../dtos/employee.dtos';

class FirebaseManager {
  private dbURL: string = process.env.DB_URL;
  private db: firebase.default.database.Database;
  private StaffManagementRef: firebase.default.database.Reference;
  private section: string = "Staff-Management";
  private section2: string = "vacation";
  private static _instance: FirebaseManager;

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }


  constructor() {
    firebase.default.initializeApp({
      databaseURL: this.dbURL,
      serviceAccount: './permissions.json'
    });
    this.db = firebase.default.database();
    this.StaffManagementRef = this.db.ref('Users');
  }


  private validateStaffManagementId(phoneNumber: string, id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var path = this.StaffManagementRef.child(phoneNumber).child(this.section);
      path.once('value', snapshot => {
        if (snapshot.val() == null) {
          var error = {
            status: 404,
            data: null,
            message: 'No Employee Data Found',
          };
          reject(error);
        }

        else {
          var ths = Object.keys(snapshot.toJSON());
          if (ths.length) {
            if (ths.includes(id)) {
              resolve(true);
            } else {
              var error = {
                status: 404,
                data: null,
                message: 'invalid Employee id',
              };
              reject(error);
            }
          } else {
            var error = {
              status: 404,
              data: null,
              message: 'No data found to update',
            };
            reject(error);
          }
        }
      })
    })
  }

  getEmployee(phoneNumber: string, id?: string): Promise<firebase.default.database.DataSnapshot> {
    return new Promise<firebase.default.database.DataSnapshot>((resolve, reject) => {
      var path = id ? this.StaffManagementRef.child(phoneNumber).child(this.section).child(id) : this.StaffManagementRef.child(phoneNumber).child(this.section);
      path.once('value', snapshot => {
        if (snapshot.val() == null) {
          var error = {
            status: 403,
            data: null,
            message: 'No Data Found',
          };
          reject(error);
        }
        else {
          resolve(snapshot);
        }
      });
    });
  }

  createEmployee(phoneNumber: string, data: EmployeeDto, id: string): Promise<EmployeeDto> {
    return new Promise<EmployeeDto>((resolve, reject) => {
      var path = this.StaffManagementRef.child(phoneNumber).child(this.section).child(id).set(data)
        .then(() => {
          resolve(data);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  updateEmployee(phoneNumber: string, data: EmployeeDto, id: string): Promise<EmployeeDto> {
    return new Promise<EmployeeDto>((resolve, reject) => {
      this.validateStaffManagementId(phoneNumber, id)
        .then(() => {
          this.createEmployee(phoneNumber, data, id)
            .then(s => {
              resolve(s);
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

  deleteEmployee(phoneNumber: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validateStaffManagementId(phoneNumber, id)
        .then(() => {
          this.StaffManagementRef.child(phoneNumber)
            .child(this.section)
            .child(id)
            .remove()
            .then(() => {
              resolve({ status: 200, data: null, message: 'Employee removed successfully from the staff management ' + id });
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

export default FirebaseManager;