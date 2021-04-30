"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    emp_id: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    surname: joi_1.default.string().required(),
    age: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
    joiningDate: joi_1.default.string().required(),
    designation: joi_1.default.string().required(),
    emailId: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    bankDetails: joi_1.default.object().required(),
    employeeRole: joi_1.default.string().required(),
    salary: joi_1.default.string().required(),
    skills: joi_1.default.string().required(),
});
const transactionMiddleWare = () => {
    return (req, res, next) => {
        if (!req.body) {
            res.status(405).json({
                status: 405,
                message: 'Request must contain body',
                data: {},
            });
        }
        else if (req.body) {
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
exports.default = transactionMiddleWare;
//# sourceMappingURL=staff.middleware.js.map