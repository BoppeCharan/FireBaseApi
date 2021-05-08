import { RequestHandler } from 'express';
import Joi from 'joi';

const schema = Joi.object({
    period: Joi.string().required(),

    startDate: Joi.string().required(),

    endDate: Joi.string().required(),

    reason: Joi.string().required(),

    status: Joi.string().required()
});

const vacationMiddleWare = (): RequestHandler => {
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
  
  export default vacationMiddleWare;
  