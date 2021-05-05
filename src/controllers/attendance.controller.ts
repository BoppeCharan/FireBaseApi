import { NextFunction, Request, Response } from 'express';

import {AttendanceDto} from '../dtos/attendance.dtos';
import {Attendance} from '../interfaces/attendance.interface';
import AttendanceService from '../services/attendance.service'


class AttendanceController {


  private attendanceService = new AttendanceService();

  public getAttendances = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      var PhoneNumber = req.params.phoneNumber;
      var employeeId = req.params.employeeId;

      this.attendanceService
        .readAttendanceData(PhoneNumber, employeeId)
        .then(s => {
          res.status(200).json(s);
        })
        .catch(e => {
          res.status(e.status).json(e);
        });
    } catch (error) {
      next(error);
    }
  };

  public updateAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const employeeId = req.params.employeeId;
      const id = req.params.id;
      const attendance : Attendance = req.body;

      this.attendanceService
        .updateAttendance(phoneNumber, attendance, employeeId,id)
        .then(s => {
          res.status(200).json(s);
        })
        .catch(e => {
          res.status(e.status).json(e);
        });
    } catch (e) {
      next(e);
    }
  };

  public deleteAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const employeeId = req.params.employeeId;
      const id = req.params.id;

      this.attendanceService
        .deleteAttendance(phoneNumber, employeeId,id)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          res.status(e.status).json(e);
        });
    } catch (e) {
      next(e);
    }
  };


  public addAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacation: AttendanceDto = req.body;
      const phoneNumber = req.params.phoneNumber;
      const id = req.params.employeeId;

      this.attendanceService
        .createAttendance(phoneNumber, vacation, id)
        .then(s => {
          res.status(200).json({status:200,data:s,message:"The Data is Added"});
        })
        .catch(e => {
          res.status(e.status).json(e);
        });
    } catch (e) {
      next(e);
    }
  };




}

export default AttendanceController;

