/// <reference lib="dom" />
import * as fb from 'firebase';
import { VacationDto } from '../../dtos/vacation.dtos';

class VacationFirebaseManager {
  private dbURL: string = process.env.DB_URL;
  private db: fb.default.database.Database;
  private VacationRef: fb.default.database.Reference;
  private section: string = 'Staff-Management';
  private section2: string = 'vacations';

  constructor() {
    this.db = fb.default.database();
    this.VacationRef = this.db.ref('Users');
  }

  private validateStaffManagementId(phoneNumber: string, id: string): Promise<boolean> {
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
        } else {
          var ths = Object.keys(snapshot.toJSON());
          if (ths.length) {
            if (ths.includes(id)) {
              resolve(true);
            } else {
              var e = {
                status: 404,
                data: {},
                message: 'invalid Employee id',
              };
              reject(e);
            }
          } else {
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

  getVacation(phoneNumber: string, id: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber).child(this.section).child(this.section2);
      path.once('value', snapshot => {
        if (snapshot.val() == null) {
          var error = {
            status: 403,
            data: {},
            message: 'No Data Found',
          };
          reject(error);
        } else {
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

  createEmployeeVacation(phoneNumber: string, data: VacationDto, id: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber)
        .child(this.section)
        .child(this.section2)
        .child(id)
        .push(data)
        .then(s => {
          data['id'] = s.key.toString();
          this.VacationRef.child(phoneNumber)
            .child(this.section)
            .child(this.section2)
            .child(id)
            .child(s.key.toString())
            .update(data)
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
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  updateVacation(phoneNumber: string, data: VacationDto, id: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.validateStaffManagementId(phoneNumber, id)
        .then(() => {
          this.VacationRef.child(phoneNumber)
            .child(this.section)
            .child(this.section2)
            .child(id)
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

  deleteVacation(phoneNumber: string, id: string , vacationId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber).child(this.section).child(this.section2).child(id).child(vacationId).remove();
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

export default VacationFirebaseManager;
