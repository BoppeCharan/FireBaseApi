"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDetailsDto = void 0;
const class_validator_1 = require("class-validator");
class PaymentDetailsDto {
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "curr_salary", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "baseSalary", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "amountPaid", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "advancePayment", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "taxDetails", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "providentFund", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "paymentDue", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PaymentDetailsDto.prototype, "lastPaidOn", void 0);
exports.PaymentDetailsDto = PaymentDetailsDto;
//# sourceMappingURL=paymentDetails.dtos.js.map