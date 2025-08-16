"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenCallsModule = void 0;
const common_1 = require("@nestjs/common");
const open_calls_service_1 = require("./open-calls.service");
const open_calls_controller_1 = require("./open-calls.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let OpenCallsModule = class OpenCallsModule {
};
exports.OpenCallsModule = OpenCallsModule;
exports.OpenCallsModule = OpenCallsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [open_calls_controller_1.OpenCallsController],
        providers: [open_calls_service_1.OpenCallsService],
    })
], OpenCallsModule);
//# sourceMappingURL=open-calls.module.js.map