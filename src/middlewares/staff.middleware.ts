import { RequestHandler } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  emp_id: Joi.string().required(),

  firstName: Joi.string().required(),

  surname: Joi.string().required(),

  age: Joi.string().required(),

  gender: Joi.string().required(),

  phoneNumber: Joi.string().required(),

  joiningDate: Joi.string().required(),

  designation: Joi.string().required(),

  emailId: Joi.string().required(),

  status: Joi.string().required(),

  address: Joi.string().required(),

  bankDetails: Joi.object().required(),

  employeeRole: Joi.string().required(),

  salary: Joi.string().required(),

  skills: Joi.string().required(),

});

const staffMiddleware = (): RequestHandler => {
  return (req, res, next) => {
    if (!req.body) {
      res.status(405).json({
        status: 405,
        message: 'Request must contain body',
        data: {},
      });
    } else if (req.body) {
      schema
        .validateAsync(req.body)
        .then(() => {
          next();
        })
        .catch(e => {
          var error = {
            status: 404,
            message: e.details[0].message,
            data: {},
          };

          res.status(error.status).json(error);
        });
    }
  };
};

export default staffMiddleware;
