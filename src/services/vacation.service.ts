import HttpException from '../exceptions/HttpException';
import e from 'express';
import fb from '../Dbmanagers/firebase/vacationFirebaseManager';
import { VacationDto } from '../dtos/vacation.dtos';

class VacationService {

  private db = new fb();


  public async createEmployeeVacation(phoneNumber: string, VacationData: VacationDto, empId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .createEmployeeVacation(phoneNumber, VacationData, empId)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async readVacationData(phoneNumber: string, empId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .getVacation(phoneNumber, empId)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async updateVacation(phoneNumber: string, VacationData: VacationDto, empId: string, vacationId: string): Promise<any> {
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

  public async deleteVacation(phoneNumber: string, empId: string , vacationId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .deleteVacation(phoneNumber, empId , vacationId)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

export default VacationService;
