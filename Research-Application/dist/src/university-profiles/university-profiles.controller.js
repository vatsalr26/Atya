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
exports.UniversityProfilesController = void 0;
const common_1 = require("@nestjs/common");
const university_profiles_service_1 = require("./university-profiles.service");
const update_university_profile_dto_1 = require("./dto/update-university-profile.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let UniversityProfilesController = class UniversityProfilesController {
    constructor(universityProfilesService) {
        this.universityProfilesService = universityProfilesService;
    }
    update(user, dto) {
        const userId = user.sub;
        return this.universityProfilesService.update(userId, dto);
    }
};
exports.UniversityProfilesController = UniversityProfilesController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserRole.UNIVERSITY_STAFF),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)('me'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_university_profile_dto_1.UpdateUniversityProfileDto]),
    __metadata("design:returntype", void 0)
], UniversityProfilesController.prototype, "update", null);
exports.UniversityProfilesController = UniversityProfilesController = __decorate([
    (0, common_1.Controller)('university-profiles'),
    __metadata("design:paramtypes", [university_profiles_service_1.UniversityProfilesService])
], UniversityProfilesController);
//# sourceMappingURL=university-profiles.controller.js.map