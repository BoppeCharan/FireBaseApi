/// <reference lib="dom" />
import * as fb from 'firebase';
import { string } from 'joi';
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
    var vacationId = createUniqueId(data.startDate , data.endDate , id);
    return new Promise<object>((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber)
        .child(this.section)
        .child(this.section2)
        .child(id)
        .child(vacationId.toString())
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

function createUniqueId(startDate:string , endDate:string , id: string) {
  var date = new Date(startDate);
  var date1 = new Date(endDate);
  
  var s = date.getDate();
  
  var sm = date.getMonth();
  var sy = date.getFullYear();

  var t = date1.getDate();
  var tm = date1.getMonth(); 
  var ty = date1.getFullYear();

  var uniqueId: string = `${s}${sm}${sy}-${t}${tm}${ty}-${id}` ;
  

  return uniqueId;
}

export default VacationFirebaseManager;
