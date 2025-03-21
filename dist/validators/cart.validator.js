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
exports.RemoveFromCartDto = exports.UpdateCartItemDto = exports.AddToCartDto = void 0;
const class_validator_1 = require("class-validator");
class AddToCartDto {
    constructor() {
        this.productId = '';
        this.quantity = 1;
    }
}
exports.AddToCartDto = AddToCartDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddToCartDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddToCartDto.prototype, "quantity", void 0);
class UpdateCartItemDto {
    constructor() {
        this.cartItemId = '';
        this.quantity = 1;
    }
}
exports.UpdateCartItemDto = UpdateCartItemDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCartItemDto.prototype, "cartItemId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateCartItemDto.prototype, "quantity", void 0);
class RemoveFromCartDto {
    constructor() {
        this.cartItemId = '';
    }
}
exports.RemoveFromCartDto = RemoveFromCartDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoveFromCartDto.prototype, "cartItemId", void 0);
//# sourceMappingURL=cart.validator.js.map