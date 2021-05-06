/// <reference lib="dom" />
import * as fb from 'firebase';
import { AttendanceDto } from '../../dtos/attendance.dtos';

class AttendanceFirebaseManager {

  private dbURL: string = process.env.DB_URL;
  private db: fb.default.database.Database;
  private AttendanceRef: fb.default.database.Reference;
  private section: string = 'Attendance';

  constructor() {
    this.db = fb.default.database();
    this.AttendanceRef = this.db.ref('Users');
  }


  public createUniqueId(startDate:string) {
    var date = new Date(startDate);
    var s = date.getDate();
    var sm = date.getMonth()+1;
    var sy = date.getFullYear();
    var uniqueId: string = `${s}${sm}${sy}` ;
    return uniqueId;

  }

  private validateAttendanceId(phoneNumber: string, empId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var th = this.AttendanceRef.child(phoneNumber).child(this.section);
      th.once('value', snapshot => {
        if (snapshot.val() == null) {
          var error = {
            status: 404,
            data: {},
            message: 'No data found',
          };
          reject(error);
        } else {
          var ths = Object.keys(snapshot.toJSON());
          if (ths.length) {
            if (ths.includes(empId)) {
              resolve(true);
            } else {
              var er = {
                status: 404,
                data: {},
                message: 'Invalid Employee Id',
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

  getAttendanceData(phoneNumber: string, empId: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      var path = this.AttendanceRef.child(phoneNumber).child(this.section).child(empId);
      path.once('value', snapshot => {
        if (snapshot.val() == null) {
          var error = {
            status: 404,
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

  createAttendance(phoneNumber: string, data: AttendanceDto, empId: string,): Promise<object> {
    return new Promise<object>((resolve, reject) => {

      this.validateAttendanceId(phoneNumber,empId)
      .then(() => {
      var str = this.createUniqueId(data.date);
      var path = this.AttendanceRef.child(phoneNumber).child(this.section).child(empId).child(str).set(data)
      .then(() => {
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


  updateAttendance(phoneNumber: string, data: AttendanceDto, empId: string,id : string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.validateAttendanceId(phoneNumber, empId)
        .then(() => {
          this.AttendanceRef.child(phoneNumber)
            .child(this.section)
            .child(empId)
            .child(id)
            .update(data)
            .then(() => {
              var respo = {
                status: 200,
                data: data,
                message: 'Successfully updated'
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

  deleteAttendance(phoneNumber: string, empId: string,id:string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validateAttendanceId(phoneNumber, empId)
        .then(() => {
          this.AttendanceRef.child(phoneNumber)
            .child(this.section)
            .child(empId)
            .child(id)
            .remove()
            .then(() => {
              var respo = {
                status: 200,
                data: {},
                message: 'Successfully deleted'
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



}

export default AttendanceFirebaseManager;
