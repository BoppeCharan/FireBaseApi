import HttpException from '../exceptions/HttpException';
import { Employee } from '../interfaces/employee.interface';
import employeeModel from '../models/employee.model';
import { isEmpty } from 'class-validator';
import { PaymentDetails } from '../interfaces/paymentDetails.interface';
import { EmployeeDto } from '../dtos/employee.dtos';
import e from 'express';
import firebase from '../dbmanagers/firebase/FirebaseManager';

class EmployeeService {
  private db = new firebase();

  public async createEmployee(phoneNumber: string, EmployeeData: EmployeeDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .createEmployee(phoneNumber, EmployeeData, EmployeeData.emp_id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async readEmployeeData(phoneNumber: string, id?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .getEmployee(phoneNumber, id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async updateEmployee(phoneNumber: string, id: string, EmployeeData: EmployeeDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .updateEmployee(phoneNumber, EmployeeData, id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async deleteEmployee(phoneNumber: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .deleteEmployee(phoneNumber, id)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

export default EmployeeService;