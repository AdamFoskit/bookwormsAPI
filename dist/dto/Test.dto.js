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
const type_graphql_1 = require("type-graphql");
const Address_dto_1 = require("./classes/types/Address.dto");
let TestDto = class TestDto {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TestDto.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(() => Address_dto_1.AddressDto),
    __metadata("design:type", Address_dto_1.AddressDto)
], TestDto.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TestDto.prototype, "first_name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TestDto.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], TestDto.prototype, "teams", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], TestDto.prototype, "favorites", void 0);
TestDto = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.ArgsType()
], TestDto);
exports.default = TestDto;
