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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenCallsController = void 0;
const common_1 = require("@nestjs/common");
const open_calls_service_1 = require("./open-calls.service");
const create_open_call_dto_1 = require("./dto/create-open-call.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let OpenCallsController = class OpenCallsController {
    constructor(openCallsService) {
        this.openCallsService = openCallsService;
    }
    async create(user, dto) {
        const universityProfileId = user.profileId;
        return this.openCallsService.create(universityProfileId, dto);
    }
    findAll(query) {
        return this.openCallsService.findAll(query);
    }
    findOne(id) {
        return this.openCallsService.findOne(id);
    }
    findApplicationsForCall(openCallId, user) {
        const staffUserId = user.sub;
        return this.openCallsService.findApplicationsForCall(openCallId, staffUserId);
    }
};
exports.OpenCallsController = OpenCallsController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserRole.UNIVERSITY_STAFF),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_open_call_dto_1.CreateOpenCallDto]),
    __metadata("design:returntype", Promise)
], OpenCallsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OpenCallsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpenCallsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserRole.UNIVERSITY_STAFF),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id/applications'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OpenCallsController.prototype, "findApplicationsForCall", null);
exports.OpenCallsController = OpenCallsController = __decorate([
    (0, common_1.Controller)('open-calls'),
    __metadata("design:paramtypes", [open_calls_service_1.OpenCallsService])
], OpenCallsController);
//# sourceMappingURL=open-calls.controller.js.map