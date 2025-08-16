"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const universities_module_1 = require("./universities/universities.module");
const researcher_profiles_module_1 = require("./researcher-profiles/researcher-profiles.module");
const university_profiles_module_1 = require("./university-profiles/university-profiles.module");
const open_calls_module_1 = require("./open-calls/open-calls.module");
const applications_module_1 = require("./applications/applications.module");
const proposals_module_1 = require("./proposals/proposals.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            universities_module_1.UniversitiesModule,
            proposals_module_1.ProposalsModule,
            researcher_profiles_module_1.ResearcherProfilesModule,
            university_profiles_module_1.UniversityProfilesModule,
            open_calls_module_1.OpenCallsModule,
            applications_module_1.ApplicationsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map