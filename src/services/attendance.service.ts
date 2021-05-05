import HttpException from '../exceptions/HttpException';
import e from 'express';
import fb from '../Dbmanagers/firebase/attendanceFirebaseManager';
import { AttendanceDto } from '../dtos/attendance.dtos';

class AttendanceService {

  private db = new fb();


  public async createAttendance(phoneNumber: string, AttendanceData: AttendanceDto, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .createAttendance(phoneNumber, AttendanceData, id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async readAttendanceData(phoneNumber: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .getAttendanceData(phoneNumber, id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async updateAttendance(phoneNumber: string, AttendanceData: AttendanceDto, empId: string,id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .updateAttendance(phoneNumber, AttendanceData, empId,id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async deleteAttendance(phoneNumber: string, empId: string,id:string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .deleteAttendance(phoneNumber, empId,id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

export default AttendanceService;
