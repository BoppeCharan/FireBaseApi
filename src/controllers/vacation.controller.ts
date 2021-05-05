import { NextFunction, Request, Response } from 'express';
import { VacationDto } from '../dtos/vacation.dtos';
import { vacation } from '../interfaces/vacation.interface';
import vacationService from '../services/vacation.service';

class vacationController {

  private vacationServicee = new vacationService();

  public getVacations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      var PhoneNumber = req.params.phoneNumber;
      var employeeId = req.params.employeeId;

      this.vacationServicee
        .readVacationData(PhoneNumber, employeeId)
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

  public updateVacation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const employeeId = req.params.emp_id;
      const vacation: VacationDto = req.body;

      this.vacationServicee
        .updateVacation(phoneNumber, vacation, employeeId)
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

  public deleteVacation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const employeeId = req.params.employeeId;
      const vacationId = req.params.vacationId;

      this.vacationServicee
        .deleteVacation(phoneNumber, employeeId , vacationId)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          next(e);
        });
    } catch (e) {
      next(e);
    }
  };


  public addVacation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacation: VacationDto = req.body;
      const phoneNumber = req.params.phoneNumber;
      const id = req.params.employeeId;

      this.vacationServicee
        .createEmployeeVacation(phoneNumber, vacation, id)
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
}

export default vacationController;