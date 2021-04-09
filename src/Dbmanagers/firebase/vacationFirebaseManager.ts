import fb from 'firebase';
import { VacationDto } from '../../dtos/vacation.dtos';

class VacationFirebaseManager {

  private dbURL: string = process.env.DB_URL;
  private db: fb.database.Database;
  private VacationRef: fb.database.Reference;
  private section: string = "Staff-Management";
  private section2: string = "vacation";



  constructor() {
    this.db = fb.database();
    this.VacationRef = this.db.ref('Users');
  }

  private validateStaffManagementId(phoneNumber: string, id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber).child(this.section).child(id).child(this.section2);
      path.once('value', snapshot => {
        if (snapshot.val() == null) {
          var error = {
            status: 404,
            message: 'No Employee Vacation Data Found',
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
                message: 'invalid Employee id',
              };
              reject(error);
            }
          } else {
            var error = {
              status: 404,
              message: 'No data found to update',
            };
            reject(error);
          }
        }
      })
    })
  }

  getVacation(phoneNumber: string, id: string): Promise<fb.database.DataSnapshot> {
    return new Promise<fb.database.DataSnapshot>((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber).child(this.section).child(id).child(this.section2);
      path.once('value', snapshot => {
        if (snapshot.val() == null) {
          var error = {
            status: 403,
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


  createEmployeeVacation(phoneNumber: string, data: VacationDto, id: string): Promise<VacationDto> {
    return new Promise<VacationDto>((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber).child(this.section).child(id).child(this.section2).set(data)
        .then(() => {
          resolve(data);
        })
        .catch(e => {
          reject(e);
        });
    });
  }


  updateVacation(phoneNumber: string, data: VacationDto, id: string): Promise<VacationDto> {
    return new Promise<VacationDto>((resolve, reject) => {
      this.validateStaffManagementId(phoneNumber, id)
        .then(() => {
          this.createEmployeeVacation(phoneNumber, data, id)
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


  deleteVacation(phoneNumber: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var path = this.VacationRef.child(phoneNumber).child(this.section).child(id).child(this.section2).remove();
      path.then(() => {
        resolve({ message: 'Employee Vacation removed successfully from the staff management ' + id });
      })
        .catch(e => {
          reject(e);
        });
    })
  }

}

export default VacationFirebaseManager;