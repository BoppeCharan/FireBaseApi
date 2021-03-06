/// <reference lib="dom" />
import * as firebase from 'firebase';
import { EmployeeDto } from '../../dtos/employee.dtos';

class FirebaseManager {
  private dbURL: string = process.env.DB_URL;
  private db: firebase.default.database.Database;
  private StaffManagementRef: firebase.default.database.Reference;
  private section: string = 'Staff-Management';
  private section2: string = 'vacation';
  private static _instance: FirebaseManager;

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  constructor() {
    firebase.default.initializeApp({
      databaseURL: this.dbURL,
      serviceAccount: './bigbusinessFirebaseDev100.json',
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
            data: {},
            message: 'No Employee Data Found',
          };
          reject(error);
        } else {
          var ths = Object.keys(snapshot.toJSON());
          if (ths.length) {
            if (ths.includes(id)) {
              resolve(true);
            } else {
              var er = {
                status: 404,
                data: {},
                message: 'invalid Employee id',
              };
              reject(er);
            }
          } else {
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

  getEmployee(phoneNumber: string, id?: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
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
        } else {
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

  createEmployee(phoneNumber: string, data: EmployeeDto, id: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
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

  updateEmployee(phoneNumber: string, data: EmployeeDto, id: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
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

  deleteEmployee(phoneNumber: string, id: string): Promise<any> {
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
              resolve( { message: 'Employee removed successfully from the staff management '+ id });
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
