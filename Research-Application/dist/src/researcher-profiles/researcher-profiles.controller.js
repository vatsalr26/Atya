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
exports.ResearcherProfilesController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const update_researcher_profile_dto_1 = require("./dto/update-researcher-profile.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const researcher_profiles_service_1 = require("./researcher-profiles.service");
let ResearcherProfilesController = class ResearcherProfilesController {
    constructor(researcherProfilesService) {
        this.researcherProfilesService = researcherProfilesService;
    }
    update(user, dto) {
        const userId = user.sub;
        return this.researcherProfilesService.update(userId, dto);
    }
};
exports.ResearcherProfilesController = ResearcherProfilesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('me'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_researcher_profile_dto_1.UpdateResearcherProfileDto]),
    __metadata("design:returntype", void 0)
], ResearcherProfilesController.prototype, "update", null);
exports.ResearcherProfilesController = ResearcherProfilesController = __decorate([
    (0, common_1.Controller)('researcher-profiles'),
    __metadata("design:paramtypes", [researcher_profiles_service_1.ResearcherProfilesService])
], ResearcherProfilesController);
//# sourceMappingURL=researcher-profiles.controller.js.map